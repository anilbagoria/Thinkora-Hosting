const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
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
  } catch (error) {
    console.error("❌ MAIL ERROR:", error.message);
    console.error("Details:", error);
    throw error;
  }
};

module.exports = mailSender;