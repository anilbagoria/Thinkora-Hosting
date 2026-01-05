const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,

      // ✅ ADD THESE TWO LINES (TLS FIX)
      port: process.env.MAIL_PORT,
      secure: true, // MUST be true for Gmail (465)

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    let info = await transporter.sendMail({
      from: `"Thinkora | CodeAnil" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    })

    console.log("MAIL SENT ✅", info.response)
    return info
  } catch (error) {
    console.log("MAIL ERROR ❌", error)
    return error.message
  }
}

module.exports = mailSender
