const { verifyToken } = require("./userController");
const crypto = require("crypto");
const { transporter } = require("../utils/nodemailer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const resetPasswordController = {
  sendLink: async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ error: "Email not found. Cannot initiate password reset." });
      }

      const token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: 3600,
      });

      const link = `http://localhost:5173/reset-password/${token}`;

      const message = `
          <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
              <div style="max-width: 700px; background-color: white; margin: 0 auto">
                  <div style="width: 100%; background-color: #654ea3; padding: 20px 0">
                      <img
                          src="https://res.cloudinary.com/depi6sft8/image/upload/v1707348591/svj5m1zy8daiftfqarof.png"
                          style="width: 100%; height: 70px; object-fit: contain"
                      />
                  </div>
              <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
                  <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                      Peephole
                    </p>,
                  <div style="font-size: .8rem; margin: 0 30px">
                      <p>Hi!</p>
                      <p>You have requested a password reset.</p>
                      <p>Please click the following link to reset your password:</p>
                      <p><a href="${link}">${link}</a></p>
                      <p>If you did not request this, please ignore this email.</p>
                  </div>
                </div>
            </div>
          </div>
        `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Peephole password reset",
        html: message,
      });

      return res.status(200).json({
        message: "Password reset email sent. Check your inbox!",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal server error", message: error.message });
    }
  },
  verifyToken: async (req, res) => {
    // obtener el token del request
    const { token } = req.body;

    if (token) {
      // verificar el token con jwt
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
          return res.status(401).json({ error: "Token is invalid" });
        }

        return res.status(200).send();
      });
    } else {
      return res.status(400).json({ error: "Missing token" });
    }
  },
  resetPassword: async (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: "Missing token or password" });
    }
    jwt.verify(token, process.env.SECRET, async function (err, decoded) {
      if (err) {
        return res.status(401).json({ error: "Token is invalid" });
      }

      const updatedPassword = await bcrypt.hash(password, 10);

      const user = await User.findOneAndUpdate(
        { email: decoded.email },
        {
          password: updatedPassword,
        }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).send();
    });
  },
};
module.exports = resetPasswordController;
