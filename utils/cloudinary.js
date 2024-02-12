const { v2: cloudinary } = require("cloudinary");
//luego lo enviare a .env
cloudinary.config({
  cloud_name: "depi6sft8",
  api_key: "731523832813974",
  api_secret: "RjWyrGB__VZupCQWu1DnuTn6-eI",
});

module.exports = cloudinary;
