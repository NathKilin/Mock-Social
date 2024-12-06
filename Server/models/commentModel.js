const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // ref to the Post collection
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ref to the User collection
    required: true,
  },
  // likes: {
  //   type: Number,
  //   ref: "Likes",
  //   default: 0,
  // },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// virtual
commentSchema.virtual("likes").get(function () {
  return this.likedBy?.length;
});

// to enable virtuales
commentSchema.set("toObject", { virtuals: true });
commentSchema.set("toJSON", { virtuals: true });

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
