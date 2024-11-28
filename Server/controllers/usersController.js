const User = require("../models/usersModel.js");
const Saved = require("../models/savedModel.js");

const {
  makeHashedPassword,
  signInAuth,
  creatToken,
} = require("../auth/auth.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//  get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
};

// get saved posts
const getSavedPosts = async (req, res) => {};

// add saved posts
const addSavedPosts = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const baba = await Saved.findByIdAndUpdate("6744c6087b328516091bf7d8", {
      $push: { postId },
    });

    if (!userId || !postId) {
      return res.status(400).send({ massege: "missing fileds" });
    }

    // const newSaved = new Saved({
    //   userId,
    //   postId,
    // });
    // const savedSaved = await newSaved.save();
    // res.status(200).send({ message: "yey", savedSaved });
    res.status(200).send({ message: "baba", baba });
  } catch (error) {
    return res.status(500).send({ massege: error });
  }
};

// get user by id
async function getUsereById(req, res) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(404).json({ massege: "id not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    return res.status(500).json({ massege: error.massege });
  }
}

//   add user
const addUser = async (req, res) => {
  const { firstName, lastName, userName, email, phone, password, role } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !userName ||
    !email ||
    !phone ||
    !password ||
    !role
  ) {
    return res.status(401).send({ massege: "bad request" });
  }

  try {
    const hashedPassword = await makeHashedPassword(
      password,
      process.env.BCRYPT_KEY,
      process.env.SALT_NUM
    );

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      phone,
      role,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const id = savedUser._id;
    res.send({
      message: "seve this id to delete or update the user latter on",
      id,
      role,
    });
  } catch (error) {
    // check if it mongoose error
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error occurred.",
        error: error.message,
      });
    } else if (error.code === 11000) {
      return res.status(409).send({
        message: "Duplicate key error. This user already exists.",
        error: error.message,
      });
    } else {
      console.error(error);
      return res.status(500).send({ error });
    }
  }
};

// sign in
const signIn = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).send({ massege: "password requiere" });
    }

    const id = req.params.id;
    const user = await User.findById(id);
    const hashedPassword = user.password;
    const isMatch = await signInAuth(req.body.password, hashedPassword);

    if (isMatch === false) {
      return res
        .status(401)
        .send({ success: false, message: "Wrong password" });
    }

    const token = await creatToken(id, "us", process.env.JWT_KEY);

    res
      .status(200)
      .send({ success: true, message: "Login successfuly", token });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const lightSignIn = async (req, res) => {
  try {
    console.log("baba");

    const { userName, email } = req.body;
    if (!userName || !email) {
      return res.status(400).send({ massege: "userName and email required" });
    }

    const user = await User.find({ userName: userName });
    console.log(user);

    if (user.length === 0) {
      return res.status(401).send({ massege: "wrong user Name" });
    } else if (user[0].email !== email) {
      return res.status(401).send({ massege: "wrong email" });
    }

    return res.status(200).send({
      massege: "you are realy you!!",
      userId: user[0]._id,
      role: user[0].role,
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

//   update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, userName, phone, email, password, role } =
      req.body;
    const filedsToUpdate = {};

    if (firstName || firstName !== "") {
      filedsToUpdate.firstName = firstName;
    }

    if (lastName || lastName !== "") {
      filedsToUpdate.lastName = lastName;
    }

    if (userName || userName !== "") {
      filedsToUpdate.userName = userName;
    }

    if (phone || phone !== "") {
      filedsToUpdate.phone = phone;
    }

    if (email || email !== "") {
      filedsToUpdate.email = email;
    }

    if (role || role !== "") {
      filedsToUpdate.role = role;
    }

    if (password || password !== "") {
      const hashedPassword = await makeHashedPassword(
        password,
        process.env.BCRYPT_KEY,
        process.env.SALT_NUM
      );
      filedsToUpdate.password = hashedPassword;
    }

    await User.findByIdAndUpdate(id, filedsToUpdate, {
      runValidators: true,
    });
    res.send({ message: "updated successfully" });
  } catch (err) {
    console.log(err.code);
    if (err.code === 11000) {
      return res.status(409).send({
        message: "Duplicate key error. This user already exists.",
        error: err.message,
      });
    } else if (err.name === "ValidationError") {
      return res.status(400).send({
        message: "Validation error occurred.",
        error: err.message,
      });
    }
    res.status(500).send({ error: `${err}` });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ message: "user not found" });
    }

    res.send({ message: "deleted successfully" });
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUsereById,
  updateUser,
  deleteUser,
  signIn,
  lightSignIn,
  getSavedPosts,
  addSavedPosts,
};
