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
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ref to the User collection
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

// How the "likes" Work:
// The likes field is an array of User IDs.
// Add a User ID to the array when they like a post.
// Remove the User ID when they unlike the post.
// Use the length of the array to determine the total like count.
