const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Social_Media_Posts", // specify a folder in your Cloudinary account
    allowed_formats: ["jpeg", "png", "jpg"], // Specify allowed formats
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
