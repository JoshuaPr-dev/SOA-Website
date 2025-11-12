"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isSubmitted) return;
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [isSubmitted, router]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setStatus("Adresse e-mail invalide");
      return;
    }

    setStatus("Envoi en cours...");

    const payload = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
      email: formData.email,
      message: formData.message,
    };

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setIsSubmitted(true);
    } else {
      setStatus("Erreur lors de l'envoi");
    }
  };

  if (isSubmitted) {
    return (
      <div className="submitContact">
        <h2 className="h2">Merci !</h2>
        <p className="p">Je reviendrais vers vous le plus vite possible !</p>
      </div>
    );
  }

  return (
    <div className="pageContact">
      <form onSubmit={handleSubmit}>
        <h2 className="h2 h2Contact paddingContact">CONTACT</h2>
        <h3 className="h3 paddingContact">Contact & Questions</h3>
        <p className="p paddingContact">
          Si tu es intéressé(e) pour travailler avec moi ou si tu as une
          question sur l'accompagnement, dis-moi tout de ton projet en
          remplissant le formulaire ci-dessous.
        </p>
        <p className="p p2Contact ">
          Je te recontacterai personnellement pour discuter de tes objectifs !
        </p>

        <div className="flexForm">
          <div className="flexLabel">
            <label htmlFor="firstName" className="labelFont">
              PRÉNOM <span className="spanContact">(obligatoire)</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="form inputFirstname"
            />
          </div>

          <div className="flexLabel">
            <label htmlFor="lastName" className="labelFont">
              NOM <span className="spanContact">(obligatoire)</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form inputLastname"
            />
          </div>
        </div>

        <div className="flexLabel divEmail">
          <label htmlFor="email" className="labelFont">
            E-MAIL <span className="spanContact">(obligatoire)</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form inputEmail"
          />
        </div>

        <div className="flexLabel divMessage">
          <label htmlFor="message" className="labelFont">
            MESSAGE <span className="spanContact">(obligatoire)</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={7}
            className="form textareaContact"
          />
        </div>

        <button type="submit" className="button buttonSubmit buttonHover">
          ENVOYER
        </button>
        <p>{status}</p>
        <div className="barre"></div>
      </form>
    </div>
  );
}
