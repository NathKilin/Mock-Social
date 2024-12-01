const express = require("express");

const {
  addLike,
  removeLike,
  getPostLikes,
} = require("../controllers/likesController.js");

const router = express.Router();

router.post("/add", addLike);
router.delete("/remove", removeLike);
router.get("/:postId", getPostLikes);

module.exports = router;
