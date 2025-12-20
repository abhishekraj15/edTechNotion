const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  console.log("Inside process.env.MAIL_USER", process.env.MAIL_USER)
  console.log("Inside process.env.MAIL_PASS", process.env.MAIL_PASS)

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    })

    let info = await transporter.sendMail({
      from: `"Studynotion | CodeHelp" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log("info is :", info)
    return info
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

module.exports = mailSender

// const { Resend } = require("resend")

// const resend = new Resend(process.env.RESEND_API_KEY)
// console.log("🚀 ~ resend:", resend)

// const mailSender = async (email, title, body) => {
//   try {
//     const data = await resend.emails.send({
//       from: "Studynotion <onboarding@resend.dev>",
//       to: email,
//       subject: title,
//       html: body,
//     })

//     console.log("✅ Email sent:", data.id)
//     return data
//   } catch (error) {
//     console.error("❌ Email error:", error)
//     throw error
//   }
// }

// module.exports = mailSender
