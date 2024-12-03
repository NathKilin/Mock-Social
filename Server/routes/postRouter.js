const express = require("express");
const { verifySplitToken } = require("../middlewares/verifyToken.js");
const { upload } = require("../middlewares/integrateCloudinary.js");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController.js");
const router = express.Router();

// Create new post with image upload
router.post(
  "/add",
  verifySplitToken,
  upload.single("image"),
  (req, res, next) => {
    try {
      // Add the image URL to req.body before passing to the controller
      if (req.file) {
        req.body.url = req.file.path; // Add the Cloudinary URL to req.body
      }
      next(); // Pass control to the createPost handler
    } catch (error) {
      res.status(500).json({ error: "Image upload failed" });
    }
  },
  createPost
);

// get all posts
router.get("/all", getAllPosts);

// get post by id
router.get("/:postId", getPostById);

// delete post by id
router.delete("/:postId", deletePost);

// update post by id
router.patch("/:postId", updatePost);

module.exports = router;
