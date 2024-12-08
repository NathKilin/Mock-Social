const User = require("../models/usersModel.js");

const addFriend = async (req, res) => {
  try {
    console.log(req.userID);

    const userId = req.userID;

    const { friendId } = req.body;
    if (!friendId) {
      return res.status(400).json({ massage: "send friendId" });
    }

    const user = await User.findById(userId);
    console.log(user);

    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ massage: "friend not found" });
    }

    if (user.friends.includes(friendId)) {
      console.log("exists");

      return res.status(400).json({ message: "You already friends" });
    }

    await User.updateOne({ _id: userId }, { $push: { friends: friendId } });
    console.log(userId);
    console.log(friendId);

    return res.status(200).json({
      message: "friend added successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeFriend = async (params) => {
  try {
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addFriend, removeFriend };
