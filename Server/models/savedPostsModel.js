const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // refers to the user collection
    required: true,
  },
  savedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // refers to the post collection
      required: true,
    },
  ],
});

module.exports = mongoose.model("SavedPosts", savedSchema);
