const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  url: {
    type: String, // URL of the img/video
    required: true,
    // validate: {
    //   // Regular expression to check if the URL ends with .png or .jpg
    //   validator: function (value) {
    //     return /\.(png|jpe?g|gif|bmp|webp)$/i.test(value);
    //   },
    //   message: (props) =>
    //     `${props.value} is not a valid image URL! It must end with . png|jpe?g|gif|bmp|webp`,
    // },
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
  likes: {
    type: Number,
    ref: "Likes",
    default: 0,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
