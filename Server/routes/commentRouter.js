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
// router.post("/add", verifySplitToken, createComment);
router.post("/add", verifySplitToken, createComment);

// Get All comments
router.get("/all", getAllComments);

// Get comment by ID
router.get("/:commentId", getCommentById);

// Delete a comment
router.delete("/:commentId", deleteComment);

// update comment
router.patch("/:commentId", updateComment);

module.exports = router;
