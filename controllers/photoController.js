const cloudinary = require("../utils/cloudinary");

const photoController = {
  addPhoto: async (req, res) => {
    try {
      let urls = [];

      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          public_id: `${Date.now()}`,
          resource_type: "auto",
          folder: "find-your-people",
        });
        urls.push(result.url);
      }
      res.json(urls);
    } catch (error) {
      if (!req.file) {
        return res.json({ error: "file not found", error });
      }
    }
  },
};

module.exports = photoController;
