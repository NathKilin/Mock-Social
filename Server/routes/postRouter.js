const express = require("express");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postsController.js");

const router = express.Router();

// create new post
router.post("/add", createPost);

// get all posts
router.get("/all", getAllPosts);

// get post by id
router.get("/:id", getPostById);

// delete post by id
router.delete("/:id", deletePost);

// update post by id
router.patch("/:id", updatePost);

module.exports = router;
