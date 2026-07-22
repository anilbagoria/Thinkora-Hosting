const nodemailer = require("nodemailer");
require("dotenv").config();

const sendWithResend = async (email, title, body) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || process.env.MAIL_USER,
      to: [email],
      subject: title,
      html: body,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  console.log("✅ Resend email sent successfully");
  return data;
};

const sendWithNodemailer = async (email, title, body) => {
  if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error(
      "Missing email configuration. Check MAIL_HOST, MAIL_USER, and MAIL_PASS in .env"
    );
  }

  const authConfig = {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  };

  const transportConfigs = [
    {
      name: "primary-gmail-smtp",
      config: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT || 465),
        secure: process.env.MAIL_SECURE === "false" ? false : true,
        auth: authConfig,
      },
    },
    {
      name: "fallback-gmail-starttls",
      config: {
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: authConfig,
        tls: {
          rejectUnauthorized: false,
        },
      },
    },
  ];

  let lastError = null;

  for (const transportOption of transportConfigs) {
    const transporter = nodemailer.createTransport(transportOption.config);

    try {
      await transporter.verify();
      console.log(`✅ SMTP Connected Successfully using ${transportOption.name}`);

      const info = await transporter.sendMail({
        from: `"Thinkora | CodeAnil" <${process.env.MAIL_USER}>`,
        to: email,
        subject: title,
        html: body,
      });

      console.log("✅ EMAIL SENT SUCCESSFULLY");
      console.log("   To:", email);
      console.log("   Response:", info.response);

      return info;
    } catch (verifyError) {
      lastError = verifyError;
      console.warn(
        `⚠️ SMTP attempt failed for ${transportOption.name}:`,
        verifyError.message
      );
    }
  }

  if (lastError) {
    console.error("❌ SMTP Connection Failed:", lastError.message);
    console.error("Check your email credentials in .env file");
    throw lastError;
  }

  throw new Error("Unable to establish SMTP connection");
};

const mailSender = async (email, title, body) => {
  try {
    try {
      return await sendWithResend(email, title, body);
    } catch (resendError) {
      console.warn(
        "⚠️ Resend path failed, falling back to Nodemailer:",
        resendError.message
      );
      return await sendWithNodemailer(email, title, body);
    }
  } catch (error) {
    console.error("❌ MAIL ERROR:", error.message);
    console.error("Details:", error);
    throw error;
  }
};

module.exports = mailSender;