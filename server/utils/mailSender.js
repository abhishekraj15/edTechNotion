const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  console.log("Inside process.env.MAIL_USER", process.env.MAIL_USER)
  console.log("Inside process.env.MAIL_PASS", process.env.MAIL_PASS)

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // 🔥 IMPORTANT
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Gmail App Password
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
