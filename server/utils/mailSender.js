const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    // ✅ FIXED: Validate required environment variables
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error(
        "Missing email configuration. Check MAIL_HOST, MAIL_USER, and MAIL_PASS in .env"
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT || 465),
      secure: process.env.MAIL_SECURE === "false" ? false : true, // ✅ FIXED: Read from env
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // ✅ FIXED: Verify SMTP connection with better error handling
    try {
      await transporter.verify();
      console.log("✅ SMTP Connected Successfully");
    } catch (verifyError) {
      console.error("❌ SMTP Connection Failed:", verifyError.message);
      console.error("Check your email credentials in .env file");
      throw verifyError;
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"Thinkora | CodeAnil" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    // ✅ FIXED: Log more detailed info for debugging
    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("   To:", email);
    console.log("   Response:", info.response);

    return info;
  } catch (error) {
    console.error("❌ MAIL ERROR:", error.message);
    console.error("Details:", error);
    throw error;
  }
};

module.exports = mailSender;