const express = require("express");
const { verifySplitToken } = require("../middlewares/verifyToken.js");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController.js");

const router = express.Router();

// create new post
router.post("/add", verifySplitToken, createPost);

// get all posts
router.get("/all", getAllPosts);

// get post by id
router.get("/:id", getPostById);

// delete post by id
router.delete("/:id", deletePost);

// update post by id
router.patch("/:id", updatePost);

module.exports = router;
