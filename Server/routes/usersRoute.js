const express = require("express");

const {
  getAllUsers,
  addUser,
  getUsereById,
  updateUser,
  signIn,
  deleteUser,
  lightSignIn,
} = require("../controllers/usersController.js");
// import { validator } from "../middlewares/validator.js";

const router = express.Router();

//  get all users
router.get("/all", getAllUsers);

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
router.patch("/:id", updateUser);

// delete user by id
router.delete("/:id", deleteUser);

module.exports = router;
