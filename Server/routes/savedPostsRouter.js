const express = require("express");
const { verifySplitToken } = require("../middlewares/verifyToken.js");
const {
  savePost,
  unsavePost,
  getAllSavedPosts,
} = require("../controllers/savedPostsController.js");

const router = express.Router();

router.post("/save/:postId", verifySplitToken, savePost);
router.delete("/unsave/:postId", verifySplitToken, unsavePost);
router.get("/all", verifySplitToken, getAllSavedPosts);

module.exports = router;
