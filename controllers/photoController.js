const cloudinary = require("../utils/cloudinary");

const photoController = {
  addPhoto: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "find-your-people",
      });
      res.json({ imageUrl: result.url });
    } catch (error) {
      console.log("error", error);
      if (!req.file) {
        return res.json({ error: "file not found", error });
      }
    }
  },
};

module.exports = photoController;
