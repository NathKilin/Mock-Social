const User = require("../models/usersModel.js");
const Saved = require("../models/savedPostsModel.js");
const Post = require("../models/postModel.js");
const Comment = require("../models/commentModel.js");

const {
  makeHashedPassword,
  creatToken,
  logInAuth,
} = require("../auth/auth.js");

const jwt = require("jsonwebtoken");

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
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id).lean();
    const id = user._id;
    const userPosts = await Post.find({ authorId: id })
      .populate({
        path: "comments",
        select: { text: 1, likes: 1 },
        populate: [
          {
            path: "likedBy",
            select: { userName: 1 },
          },
          {
            path: "authorId", // כאן השם של השדה ב-Comment
            select: { userName: 1 },
          },
        ],
      })
      .lean();
    const userComments = await Comment.find({ authorId: id })
      .populate({
        path: "likedBy",
        select: { userName: 1 },
      })
      .populate({
        path: "postId",
        select: { caption: 1, url: 1 },
      })
      .lean();

    //* add posts and comments to user
    user.userPosts = userPosts;
    user.userComments = userComments;

    if (user === null) {
      return res.status(404).json({ massege: "id not found" });
    }

    res.status(200).send({ user });
  } catch (error) {
    console.log(error.name);

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

    // because I want to add key to object thet came from mongoose
    //  i need to make it regular js object so i use .lean (it's like .toObject() )
    const response = await User.find({ userName: req.body.userName })
      .select("+password +phone +role +email")
      .lean();
    const user = response[0];
    const id = user["_id"];
    const userPosts = await Post.find({ authorId: id })
      .populate({
        path: "comments",
        select: { text: 1, likes: 1 },
        populate: {
          path: "authorId",
          select: { userName: 1 },
        },
        populate: {
          path: "likedBy",
          select: { userName: 1 },
        },
      })
      .lean();
    const userComments = await Comment.find({ authorId: id })
      .populate({
        path: "likedBy",
        select: { userName: 1 },
      })
      .populate({
        path: "postId",
        select: { caption: 1, url: 1 },
      })
      .lean();

    user.userPosts = userPosts;
    user.userComments = userComments;

    const hashedPassword = user.password;
    const isMatch = await logInAuth(req.body.password, hashedPassword);
    if (isMatch === false) {
      return res
        .status(401)
        .send({ success: false, message: "Wrong password" });
    }

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

    // in general better to not bring the id from db at all, but here I need to check if valid..
    delete user.password;

    res.status(200).json({
      user,
      token: token,
      success: true,
      message: "Login successfuly",
    });
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

// searchUsers
const searchUsers = async (req, res) => {
  try {
    const { letters, number } = req.body;

    if (!letters) {
      const randomUsers = await User.aggregate([
        { $sample: { size: parseInt(req.body.number) } },
      ]);

      return res.status(200).json({
        messege: "no letters were sent so I'm sending random users",
        users: randomUsers,
      });
    }

    if (req.body.contain === true) {
      const containLettersUsers = await User.find({
        userName: {
          $regex: new RegExp(letters, "i"),
        },
      }).limit(number);

      return containLettersUsers.length > 0
        ? res.status(200).json({ users: containLettersUsers })
        : res.status(404).json({ message: "no users contain this letters" });
    }

    // $regax - enable to create regular expretion and
    // "new RegExp" enable to use veriables

    const matchUsers = await User.find({
      userName: {
        $regex: new RegExp("^" + letters, "i"),
      },
    }).limit(number);

    return matchUsers.length > 0
      ? res.status(200).json({ users: matchUsers })
      : res.status(404).json({ message: "no match" });
  } catch (error) {
    console.log(error);
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

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ valid: false, massage: "invalid token", err });
      } else if (req.body.password) {
        const user = await User.findById(decoded.userID).select("+password");

        const isMatch = await logInAuth(req.body.password, user.password);
        console.log(`decoded ${decoded.userID}`);

        return isMatch === true
          ? res.status(200).send({ valid: true, message: "valid password!" })
          : res.status(401).send({ valid: false, massage: "invalid password" });
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
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  logIn,
  getSavedPosts,
  addSavedPosts,
  verifyToken,
};
