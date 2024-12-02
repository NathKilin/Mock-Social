const User = require("../models/usersModel.js");
const Saved = require("../models/savedModel.js");
const {
  makeHashedPassword,
  creatToken,
  logInAuth,
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
  if (!firstName || !lastName || !userName || !email || !phone || !password) {
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

// log in
const logIn = async (req, res) => {
  try {
    if (!req.body.password || !req.body.userName) {
      return res
        .status(400)
        .send({ massege: "password and userName requiere" });
    }

    const response = await User.find({ userName: req.body.userName });
    const user = response[0];
    console.log(user);
    const id = user["_id"];

    const hashedPassword = user.password;
    const isMatch = await logInAuth(req.body.password, hashedPassword);

    if (isMatch === false) {
      return res
        .status(401)
        .send({ success: false, message: "Wrong password" });
    }
    // console.log(id);

    const token = await creatToken(
      id,
      user.role ? user.role : "user",
      process.env.JWT_KEY
    );

    res.cookie("jwt", token, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });

    res
      .status(200)
      .json({ token: token, success: true, message: "Login successfuly" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

//   update user
const updateUser = async (req, res) => {
  try {
    console.log(`req.role: ${req.role}`);
    console.log(`req.userID: ${req.userID}`);

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

    if (filedsToUpdate.length === 0) {
      return res.status(400).send({ messege: "no match fileds found" });
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

// verify token
const verifyToken = async (req, res) => {
  try {
    if (!req.headers["authorization"])
      return res.status(400).send({ message: "token miss!" });
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(400).send({ message: "token miss!" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ valid: false, massage: "invalid token", err });
      } else {
        res.status(200).send({ valid: true, message: "valid token!" });
      }
    });
  } catch (error) {
    res.status(500).send({ massage: "server error", error });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUsereById,
  updateUser,
  deleteUser,
  logIn,
  getSavedPosts,
  addSavedPosts,
  verifyToken,
};
