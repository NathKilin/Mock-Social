const express = require("express");
const { verifySplitToken } = require("../middlewares/verifyToken.js");

const {
  createComment,
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
} = require("../controllers/commentController.js");

const router = express.Router();

// Create a new comment
router.post("/add", verifySplitToken, createComment);

// Get All comments
router.get("/all", getAllComments);

// Get comment by ID
router.get("/:id", getCommentById);

// Delete a comment
router.delete("/:id", deleteComment);

// update comment
router.patch("/:id", updateComment);

module.exports = router;
