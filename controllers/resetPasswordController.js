const nodemailer = require("nodemailer");
const { verifyToken } = require("./userController");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "", // Coloca tu usuario
    pass: "", // Coloca tu contraseña
  },
});

const resetPasswordController = {
  sendResetEmail: async (req, res) => {
    try {
      const { email } = req.body;

      const tokenValid = await verifyToken(req, res, () => {});

      if (!tokenValid) {
        return res
          .status(401)
          .json({ error: "Token not valid. Cannot initiate password reset." });
      }

      const resetToken = await generateResetToken();

      const mailOptions = {
        from: "peepholeeee@gmail.com",
        to: email,
        subject: "Restablecimiento de Contraseña",
        html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="http://localhost:3001/reset-password/${resetToken}">Restablecer Contraseña</a></p>`,
      };

      await transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({
          message: "Enviado con éxito.",
        });
    } catch (error) {
      console.error(
        "Error enviando el correo electrónico:",
        error
      );
      return res
        .status(500)
        .json({
          error: "Error",
        });
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
