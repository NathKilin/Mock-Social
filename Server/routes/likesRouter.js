const express = require("express");

const {
  addLike,
  removeLike,
  countLikes,
} = require("../controllers/likesController.js");

const router = express.Router();

router.post("/add", addLike);
router.delete("/:id", removeLike);
router.get("/all", countLikes);
