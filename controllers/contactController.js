const { transporter } = require("../utils/nodemailer");

const Contact = {
  sendEmail: async (req, res) => {
    const { fullName, email, message } = req.body;

    console.log("body", req.body);

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Hi! ${fullName} wants to contact you`,
      html: `
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
                    <p>
                        FullName: <b>${fullName}</b>
                    </p>
                    <p>
                        Email: <b>${email}</b>
                    </p>
                    <p>
                        Message: <i>${message}</i>
                    </p>
                </div>
            </div>
        </div>
    </div>
      `,
    });

    res.status(200).send(req.body);
  },
};
module.exports = Contact;
