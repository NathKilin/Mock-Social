const express = require("express");
const { verifySplitToken } = require("../middlewares/verifyToken.js");

const {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  getSavedPosts,
  addSavedPosts,
  searchUsers,
  logIn,
  verifyToken,
} = require("../controllers/usersController.js");

const router = express.Router();

//  get all users
router.get("/all", getAllUsers);

// add user
router.post("/", addUser);

// get user by id
router.get("/:id", getUserById);

// log in
router.post("/log_in", logIn);

// updete user by id
router.patch("/:id", verifySplitToken, updateUser);

// delete user by id
router.delete("/:id", deleteUser);

// search users
router.post("/search", searchUsers);

// get seved post
router.get("/seved_posts", getSavedPosts);

// add seved post
router.post("/seved_posts", addSavedPosts);

// verify token
router.post("/verify_token", verifyToken);

module.exports = router;
