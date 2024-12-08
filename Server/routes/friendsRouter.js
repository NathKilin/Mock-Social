const express = require("express");

const { verifySplitToken } = require("../middlewares/verifyToken.js");

const {
  addFriend,
  removeFriend,
} = require("../controllers/friendsController.js");

const router = express.Router();

router.post("/add", verifySplitToken, addFriend);

router.patch("/remove", removeFriend);
module.exports = router;
