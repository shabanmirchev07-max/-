const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const verificationCodes = {}; // временно съхранение на кодовете

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your.email@gmail.com",
    pass: "your_app_password" // използвай App Password
  }
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000); // 6-цифрен код
  verificationCodes[email] = { username, password, code };

  const mailOptions = {
    from: "your.email@gmail.com",
    to: email,
    subject: "Код за потвърждение на регистрация",
    text: `Вашият код е: ${code}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.json({ success: false });
    res.json({ success: true });
  });
});

app.post("/verify", (req, res) => {
  const { email, code } = req.body;
  if (verificationCodes[email] && verificationCodes[email].code == code) {
    // Тук може да се съхрани акаунта в база данни реално
    delete verificationCodes[email];
    return res.json({ success: true, message: "Регистрацията е успешна!" });
  }
  res.json({ success: false, message: "Грешен код." });
});

app.listen(3000, () => console.log("Server running on port 3000"));
