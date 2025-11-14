"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "@/context/supabase-provider";

import AdminGuard from "../../AdminGuard";
import AdminLogout from "../../../../../components/AdminLogout";
import Header from "../../../../../components/Header";
import Footer from "../../../../../components/Footer";

export default function TemoignagesPage() {
  const { supabase } = useSupabase();
  const [temoignages, setTemoignages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editMessage, setEditMessage] = useState("");

  const [newNom, setNewNom] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);


  const uploadPhoto = async (file) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from("testimonials-photos")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("testimonials-photos")
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Erreur upload :", error);
      throw error;
    }
  };


  const addTemoignage = async (e) => {
    e.preventDefault();

    if (!newNom.trim() || !newMessage.trim()) return;

    try {
      let photo_url = null;

      if (newPhoto) {
        photo_url = await uploadPhoto(newPhoto);
      }

      const { data, error } = await supabase
        .from("testimonials")
        .insert([{ nom: newNom, message: newMessage, photo_url }])
        .select();

      if (!error && data.length > 0) {
        setTemoignages((prev) => [data[0], ...prev]);
      }

      setNewNom("");
      setNewMessage("");
      setNewPhoto(null);
      setPhotoPreview(null);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTemoignages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setTemoignages(data || []);
    setLoading(false);
  };

  const deleteTemoignage = async (id) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (!error) setTemoignages((prev) => prev.filter((t) => t.id !== id));
  };

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditNom(t.nom);
    setEditMessage(t.message);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNom("");
    setEditMessage("");
  };

  const saveEdit = async () => {
    const { error } = await supabase
      .from("testimonials")
      .update({ nom: editNom, message: editMessage })
      .eq("id", editingId);

    if (!error) {
      setTemoignages((prev) =>
        prev.map((t) =>
          t.id === editingId ? { ...t, nom: editNom, message: editMessage } : t
        )
      );
      cancelEdit();
    }
  };

  useEffect(() => {
    fetchTemoignages();
  }, []);

  return (
    <AdminGuard>
      <div className="divAdminTemoignages">
        <Header />
        <div className="barre"></div>

        <div className="divAdminFlex">
          <h2 className="h2 h2AdminTemoignages">DASHBOARD TÉMOIGNAGES</h2>
          <AdminLogout />
        </div>

        <div className="barre"></div>

        <main>
    
          <form
            className="formAdminTemoignages"
            onSubmit={editingId ? (e) => e.preventDefault() : addTemoignage}
          >
            <div>
              <input
                type="text"
                placeholder="Nom"
                value={editingId ? editNom : newNom}
                onChange={(e) =>
                  editingId
                    ? setEditNom(e.target.value)
                    : setNewNom(e.target.value)
                }
                className="inputAdminTemoignagesNom"
              />
            </div>

            <div>
              <textarea
                placeholder="Message"
                value={editingId ? editMessage : newMessage}
                onChange={(e) =>
                  editingId
                    ? setEditMessage(e.target.value)
                    : setNewMessage(e.target.value)
                }
                rows={7}
                wrap="soft"
                className="inputAdminTemoignagesMessage"
              />
            </div>

            {!editingId && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setNewPhoto(file);
                      setPhotoPreview(URL.createObjectURL(file));
                    }
                  }}
                  className="pFichier"
                />

                {photoPreview && (
                  <img
                    src={photoPreview}
                    className="imgAdminTemoignages"
                    alt="Aperçu"
                  />
                )}
              </div>
            )}

            {editingId ? (
              <>
                <button
                  onClick={saveEdit}
                  className="buttonAdminTemoignages buttonHover"
                >
                  MODIFIER
                </button>

                <button
                  onClick={cancelEdit}
                  className="buttonAdminTemoignages buttonHover"
                >
                  ANNULER
                </button>
              </>
            ) : (
              <button type="submit" className="buttonAdminTemoignages buttonHover">
                AJOUTER
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

                  {t.photo_url && (
                    <img
                      src={t.photo_url}
                      alt={t.nom}
                      className="imgAdminTemoignages"
                    />
                  )}

                  <h3 className="h3">{t.nom} :</h3>
                  <p className="p pAdminTemoignagesMessage">{t.message}</p>

                  {editingId !== t.id && (
                    <>
                      <button
                        onClick={() => startEdit(t)}
                        className="buttonAdminTemoignages buttonHover"
                      >
                        MODIFIER
                      </button>

                      <button
                        onClick={() => deleteTemoignage(t.id)}
                        className="buttonAdminTemoignages buttonHover"
                      >
                        SUPPRIMER
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </main>

        <div className="barre"></div>

        <Footer />
      </div>
    </AdminGuard>
  );
}
