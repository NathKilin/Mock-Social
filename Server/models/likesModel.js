const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Ref to the User collection
    required: true,
  },
  likers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User collection
      required: true, // Ensures each liker is a valid user
    },
  ],
});

module.exports = mongoose.model("Likes", likesSchema);
