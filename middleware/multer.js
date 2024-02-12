const multer = require("multer");

const storage = multer.diskStorage({
  //podemos renombra la imagen cada vez que se suba la imagen
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
