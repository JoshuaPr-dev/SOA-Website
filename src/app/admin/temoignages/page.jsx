"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../../../context/supabase-provider";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

export default function AdminTemoignages() {
  const router = useRouter();
  const { supabase } = useSupabase();

  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [temoignages, setTemoignages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTemoignage, setNewTemoignage] = useState({
    nom: "",
    message: "",
    photo: null,
  });
  const [editing, setEditing] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // ✅ Vérifie la session utilisateur au montage
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("🔐 Vérification de la session Supabase...");
        // const { data } = await supabase.auth.getSession()
        if (data?.session) {
          console.log("✅ Session trouvée :", data.session.user.email);
          setSession(data.session);
          await fetchTemoignages();
        } else {
          console.warn("⚠️ Aucune session trouvée → redirection login");
          router.replace("/admin/login");
        }
      } catch (err) {
        console.error("❌ Erreur de vérification de session :", err);
        router.replace("/admin/login");
      } finally {
        setCheckingSession(false);
      }
    };
    checkSession();
  }, [supabase, router]);

  const fetchTemoignages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Erreur chargement témoignages :", error);
    } else {
      setTemoignages(data);
    }
    setLoading(false);
  };

  const uploadPhoto = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("testimonials-photos")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("testimonials-photos")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTemoignage.nom || !newTemoignage.message) return;

    try {
      let photoUrl = null;
      if (newTemoignage.photo) {
        photoUrl = await uploadPhoto(newTemoignage.photo);
      }

      const { data, error } = await supabase
        .from("testimonials")
        .insert([
          {
            nom: newTemoignage.nom,
            message: newTemoignage.message,
            photo_url: photoUrl,
          },
        ])
        .select();

      if (error) throw error;
      if (data?.length) setTemoignages([data[0], ...temoignages]);
    } catch (err) {
      console.error("❌ Erreur ajout témoignage :", err.message);
    } finally {
      setNewTemoignage({ nom: "", message: "", photo: null });
      setPhotoPreview(null);
    }
  };

  const handleDelete = async (id) => {
    await supabase.from("testimonials").delete().eq("id", id);
    setTemoignages(temoignages.filter((t) => t.id !== id));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("testimonials")
      .update({ nom: editing.nom, message: editing.message })
      .eq("id", editing.id)
      .select();

    if (!error && data?.length) {
      setTemoignages(
        temoignages.map((t) => (t.id === editing.id ? data[0] : t))
      );
      setEditing(null);
    }
  };

  if (checkingSession)
    return <div className="p">Vérification de la session en cours...</div>;

  if (!session) return null;

  return (
    <div className="divAdminTemoignages">
      <Header />
      <div className="barre"></div>
      <h2 className="h2 h2AdminTemoignages">DASHBOARD TÉMOIGNAGES</h2>

      <form
        onSubmit={editing ? handleUpdate : handleAdd}
        className="formAdminTemoignages"
      >
        <input
          type="text"
          placeholder="Nom"
          value={editing ? editing.nom : newTemoignage.nom}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, nom: e.target.value })
              : setNewTemoignage({ ...newTemoignage, nom: e.target.value })
          }
          className="inputAdminTemoignagesNom"
        />

        <textarea
          placeholder="Message"
          value={editing ? editing.message : newTemoignage.message}
          onChange={(e) =>
            editing
              ? setEditing({ ...editing, message: e.target.value })
              : setNewTemoignage({
                  ...newTemoignage,
                  message: e.target.value,
                })
          }
          rows={7}
          className="inputAdminTemoignagesMessage"
        />

        {!editing && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewTemoignage({ ...newTemoignage, photo: file });
                  setPhotoPreview(URL.createObjectURL(file));
                }
              }}
              className="pFichier"
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Aperçu"
                className="imgAdminTemoignages"
              />
            )}
          </>
        )}

        <button type="submit" className="buttonAdminTemoignages buttonHover">
          {editing ? "MODIFIER" : "AJOUTER"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="buttonAdminTemoignages buttonHover"
          >
            ANNULER
          </button>
        )}
      </form>

      {loading ? (
        <p className="p">CHARGEMENT...</p>
      ) : (
        <ul>
          {temoignages.map((t) => (
            <li key={t.id} className="paddingAdminTemoignages">
              <div className="barre"></div>
              <h3 className="h3">{t.nom} :</h3>
              <p className="p pAdminTemoignagesMessage">{t.message}</p>
              <button
                onClick={() => setEditing(t)}
                className="buttonAdminTemoignages buttonHover"
              >
                MODIFIER
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="buttonAdminTemoignages buttonHover"
              >
                SUPPRIMER
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="barre"></div>
      <Footer />
    </div>
  );
}
