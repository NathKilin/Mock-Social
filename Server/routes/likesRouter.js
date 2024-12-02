const express = require("express");

const {
  addLike,
  removeLike,
  getPostLikes,
  getCommentsLikes,
} = require("../controllers/likesController.js");

const router = express.Router();

router.post("/add", addLike);
router.delete("/remove", removeLike);
router.get("/:postId", getPostLikes);
router.get("/:commentId", getCommentsLikes);

module.exports = router;
