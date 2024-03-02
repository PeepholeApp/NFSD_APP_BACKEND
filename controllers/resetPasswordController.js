const { verifyToken } = require("./userController");
const crypto = require("crypto");
const nodemailerTransporter = require("../utils/nodemailer");

const resetPasswordController = {
  sendResetEmail: async (req, res) => {
    try {
      console.log("Reset password controller reached");
      const { email } = req.body;

      const tokenValid = await verifyToken(req, res, () => {});

      if (!tokenValid) {
        return res.status(401).json({ error: "Token not valid. Cannot initiate password reset." });
      }

      const resetToken = await generateResetToken();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Restablecimiento de Contraseña",
        html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="http://localhost:3001/reset-password/${resetToken}">Restablecer Contraseña</a></p>`,
      };

      await nodemailerTransporter.transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "Correo electrónico de restablecimiento enviado con éxito." });
    } catch (error) {
      console.error("Error enviando el correo electrónico de restablecimiento:", error);
      return res.status(500).json({ error: "Error interno del servidor al enviar el correo electrónico." });
    }
  },
};

const generateResetToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const token = buffer.toString("hex");
        resolve(token);
      }
    });
  });
};

module.exports = resetPasswordController;