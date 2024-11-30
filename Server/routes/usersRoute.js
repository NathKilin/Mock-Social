const express = require("express");

const { verifyToken } = require("../middlewares/verifyToken.js");

const {
  getAllUsers,
  addUser,
  getUsereById,
  updateUser,
  signIn,
  deleteUser,
  lightSignIn,
  getSavedPosts,
  addSavedPosts,
} = require("../controllers/usersController.js");

const router = express.Router();

//  get all users
router.get("/all", getAllUsers);

// get seved post
router.get("/seved_posts", getSavedPosts);

// add seved post
router.post("/seved_posts", addSavedPosts);

// add user
router.post("/", addUser);

// get user by id
router.get("/:id", getUsereById);

// // get random users by num of users
// router.get("/random/:num", userController.getRandomeUsers);

// sign in
router.post("/sign/:id", signIn);

// sign in
router.post("/light_sign", lightSignIn);

// updete user by id
router.patch("/:id", verifyToken, updateUser);

// delete user by id
router.delete("/:id", deleteUser);

module.exports = router;
