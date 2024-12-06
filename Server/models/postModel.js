const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  url: {
    type: String, // URL of the img/video
    required: true,
  },
  caption: {
    type: String,
    max: 200,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ref to the User collection
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Ref to the Comment collection
      default: [], // defualt to empty arr if no comments
    },
  ],
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
});

// virtuals
postSchema.virtual("commentsCount").get(function () {
  return this.comments?.length;
});

postSchema.virtual("likes").get(function () {
  return this.likedBy?.length;
});

// to enable virtuales
postSchema.set("toObject", { virtuals: true });
postSchema.set("toJSON", { virtuals: true });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
