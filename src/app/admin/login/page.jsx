const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    if (!email || !password) {
      setError("Merci de renseigner l'email et le mot de passe.");
      setLoading(false);
      return;
    }

    console.log("🔐 Tentative de connexion...");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("📡 Réponse Supabase:", { data, error });

    if (error) {
      console.error("❌ Erreur Supabase:", error.message);
      setError(
        error.message?.toLowerCase().includes("invalid")
          ? "Identifiants invalides — vérifie l'email et le mot de passe."
          : error.message || "Erreur lors de la connexion."
      );
      setLoading(false);
      return;
    }

    if (data?.session) {
      console.log("✅ Session créée avec succès :", data.session);
      setTimeout(() => {
        router.replace("/admin/temoignages");
      }, 600);
    } else {
      console.warn("⚠️ Aucune session retournée par Supabase !");
      setError("La session n’a pas pu être créée. Réessaie.");
    }
  } catch (err) {
    console.error("⚠️ Erreur inattendue :", err);
    setError("Erreur réseau ou inconnue.");
  } finally {
    setLoading(false);
  }
};
