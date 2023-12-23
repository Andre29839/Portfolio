const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  host: "smtp.meta.ua",
  secureConnection: true,
  port: 465,
  auth: {
    user: process.env.META_USER,
    pass: process.env.META_PASS,
  },
});

const mailSender = async data => {
  const email = {
    from: process.env.META_USER,
    to: "andre29839@gmail.com",
    subject: data.email,
    text: data.message,
    ...data,
  };

  await transport
    .sendMail(email)
    .then(() => console.log(`Email to ${data.to} was sended`))
    .catch(error => console.log(error));
};

export default async (req, res) => {
  const body = req.body;

  await mailSender(body);

  res.status(200).json({ status: "OK" });
};
