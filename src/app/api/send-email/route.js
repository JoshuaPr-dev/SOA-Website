import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    await resend.emails.send({
      from: "SOA Site Web <contact@strengthoptimizationacademy.com>",
      to: "dorianprevostcoaching@gmail.com",
      subject: `📩 Nouveau message de ${firstName} ${lastName}`,
      text: `
👤 Prénom : ${firstName}
👤 Nom : ${lastName}
📧 Email : ${email}

💬 Message :
${message}
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l’envoi :", error);
    return new Response(JSON.stringify({ error: "Erreur lors de l’envoi" }), {
      status: 500,
    });
  }
}
