"use client";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../../../../components/Header/index";
import Footer from "../../../../components/Footer/index";

export default function AdminTemoignages() {
  const router = useRouter();
  const [temoignages, setTemoignages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTemoignage, setNewTemoignage] = useState({
    nom: "",
    message: "",
    photo: null,
  });
  const [editing, setEditing] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      fetchTemoignages();
    };
    checkAuth();
  }, [router]);

  const fetchTemoignages = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setTemoignages(data);
    setLoading(false);
  };

  const uploadPhoto = async (file) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}.${fileExt}`;

      console.log("Téléchargement du fichier:", fileName);

      const { data, error: uploadError } = await supabase.storage
        .from("testimonials-photos")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Erreur de téléchargement:", uploadError);
        throw uploadError;
      }

      console.log("Téléchargement réussi:", data);

      const { data: urlData } = supabase.storage
        .from("testimonials-photos")
        .getPublicUrl(fileName);

      console.log("URL publique:", urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error("Erreur dans uploadPhoto:", error);
      throw error;
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTemoignage.nom || !newTemoignage.message) return;
    try {
      let photoUrl = null;
      if (newTemoignage.photo) {
        photoUrl = await uploadPhoto(newTemoignage.photo);
      }

      const testimonialData = {
        nom: newTemoignage.nom,
        message: newTemoignage.message,
        photo_url: photoUrl,
      };

      const { data, error } = await supabase
        .from("testimonials")
        .insert([testimonialData])
        .select();

      if (error) {
        console.error("Erreur d'insertion", error);
        return;
      }

      const added = Array.isArray(data) && data.length > 0 ? data[0] : null;
      if (added) setTemoignages([added, ...temoignages]);
    } catch (err) {
      console.error("Insertion exceptionnelle", err);
    } finally {
      setNewTemoignage({ nom: "", message: "", photo: null });
      setPhotoPreview(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Erreur de supression", error);
        return;
      }
      setTemoignages(temoignages.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Suppression Exceptionnelle", err);
    }
  };

  const handleEdit = (t) => setEditing(t);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .update({ nom: editing.nom, message: editing.message })
        .eq("id", editing.id)
        .select();

      if (error) {
        console.error("Erreur de la mise a jour", error);
        return;
      }

      const updated = Array.isArray(data) && data.length > 0 ? data[0] : null;
      if (updated) {
        setTemoignages(
          temoignages.map((t) =>
            t.id === editing.id ? { ...t, ...updated } : t
          )
        );
        setEditing(null);
      }
    } catch (err) {
      console.error("Mise a jour exceptionnelle", err);
    }
  };

  return (
    <div className="divAdminTemoignages">
      <Header />
      <div className="barre"></div>
      <h2 className="h2 h2AdminTemoignages">DASHBOARD TÉMOIGNAGES</h2>
      <form
        onSubmit={editing ? handleUpdate : handleAdd}
        className="formAdminTemoignages"
      >
        <div>
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
        </div>
        <div>
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
            wrap="soft"
            className="inputAdminTemoignagesMessage"
          />
        </div>
        {!editing && (
          <div>
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
          </div>
        )}
        <button type="submit" className="buttonAdminTemoignages buttonHover">
          {editing ? "MODIFIER" : "AJOUTER"}
        </button>
        {editing && (
          <button
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
              <div></div>
              <h3 className="h3">{t.nom} :</h3>
              <p className="p pAdminTemoignagesMessage">{t.message}</p>
              <button
                onClick={() => handleEdit(t)}
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
