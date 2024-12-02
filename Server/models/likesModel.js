const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Ref to the Post collection
    required: function () {
      return !this.commentId; // Required if commentId is not provided
    },
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment", // Ref to the Comment collection
    required: function () {
      return !this.postId; // Required if postId is not provided
    },
  },
  likers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User collection
      required: true,
    },
  ],
});

const Likes = mongoose.model("Likes", likesSchema);

module.exports = Likes;
