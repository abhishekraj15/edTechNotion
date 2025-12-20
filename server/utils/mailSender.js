const nodemailer = require("nodemailer")
console.log("Outside process.env.MAIL_USER", process.env.MAIL_USER)
console.log("Outside process.env.MAIL_PASS", process.env.MAIL_PASS)
const mailSender = async (email, title, body) => {
  console.log("Inside process.env.MAIL_USER", process.env.MAIL_USER)
  console.log("Inside process.env.MAIL_PASS", process.env.MAIL_PASS)

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
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
