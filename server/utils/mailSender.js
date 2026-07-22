require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;

    if (!brevoApiKey) {
      throw new Error("BREVO_API_KEY is not configured in Render environment");
    }

    if (!brevoSenderEmail) {
      throw new Error(
        "BREVO_SENDER_EMAIL is not configured. Use a verified Brevo sender email or domain."
      );
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: process.env.BREVO_SENDER_NAME || "Thinkora",
          email: brevoSenderEmail,
        },
        to: [{ email }],
        subject: title,
        htmlContent: body,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data?.message || data?.error || "Brevo API request failed";
      throw new Error(message);
    }

    console.log("✅ Brevo Mail Response:", data);
    console.log("✅ Using verified Brevo sender:", brevoSenderEmail);
    return data;
  } catch (error) {
    console.error("❌ Mail Send Error:", error.message);
    throw new Error(error.message);
  }
};

module.exports = mailSender;