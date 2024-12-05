const express = require("express");
const { verifySplitToken } = require("../middlewares/verifyToken.js");

const {
  addLike,
  removeLike,
  getPostLikes,
  getCommentsLikes,
} = require("../controllers/likesController.js");

const router = express.Router();

router.post("/add", verifySplitToken, addLike);
router.delete("/remove", verifySplitToken, removeLike);
router.get("/:postId", getPostLikes);
router.get("/:commentId", getCommentsLikes);

module.exports = router;
