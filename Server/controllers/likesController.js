const Likes = require("../models/likesModel.js");
const Post = require("../models/postModel.js");
const Comment = require("../models/commentModel.js");

const likesController = {
  addLike: async (req, res) => {
    const { userId, postId, commentId } = req.body; // change to token later

    try {
      if (postId) {
        // Handle likes for posts
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ massage: "Post not found" });
        }

        // Check if a Likes document exists for the post
        let like = await Likes.findOne({ postId });
        if (!like) {
          // Create a new Likes document for the post
          like = new Likes({ postId, likers: [] });
        }

        // Check if the user has already liked the post
        if (like.likers.includes(userId)) {
          return res
            .status(400)
            .json({ message: "You have already liked this post" });
        }

        // Add user to the likers array
        like.likers.push(userId);
        await like.save();

        // Increment the likes count and add the userId in the Post model
        post.likedBy.push(userId);
        post.likes += 1;
        await post.save();

        res.status(200).json({
          message: "Post liked successfully",
          likesCount: post.likes,
          likedBy: post.likedBy,
        });
      } else if (commentId) {
        // Handle likes for comments
        const comment = await Comment.findById(commentId);
        if (!comment) {
          return res.status(404).json({ message: "Comment not found" });
        }

        let like = await Likes.findOne({ commentId });
        if (!like) {
          like = new Likes({ commentId, likers: [] });
        }

        if (like.likers.includes(userId)) {
          return res
            .status(400)
            .json({ message: "You have already liked this comment" });
        }

        like.likers.push(userId);
        await like.save();

        comment.likedBy.push(userId);
        comment.likes += 1;
        await comment.save();

        return res.status(200).json({
          message: "Comment liked successfully",
          likesCount: comment.likes,
          likedBy: comment.likedBy,
        });
      } else {
        return res
          .status(400)
          .json({ message: "postId or commentId is required." });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  removeLike: async (req, res) => {
    const { userId, postId, commentId } = req.body; // Replace with token logic if needed

    try {
      if (postId) {
        // Handle likes removal for posts
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).json({ message: "Post not found" });
        }

        const like = await Likes.findOne({ postId });
        if (!like || !like.likers.includes(userId)) {
          return res
            .status(400)
            .json({ message: "You have not liked this post" });
        }

        like.likers = like.likers.filter(
          (liker) => liker.toString() !== userId
        );
        await like.save();

        post.likedBy = post.likedBy.filter(
          (liker) => liker.toString() !== userId
        );
        post.likes -= 1;
        await post.save();

        res.status(200).json({
          message: "Like removed successfully",
          likesCount: post.likes,
          likedBy: post.likedBy,
        });
      } else if (commentId) {
        // Handle likes removal for comments
        const comment = await Comment.findById(commentId);
        if (!comment) {
          return res.status(404).json({ message: "Comment not found" });
        }

        const like = await Likes.findOne({ commentId });
        if (!like || !like.likers.includes(userId)) {
          return res
            .status(400)
            .json({ message: "You have not liked this comment" });
        }

        like.likers = like.likers.filter(
          (liker) => liker.toString() !== userId
        );
        await like.save();

        comment.likedBy = comment.likedBy.filter(
          (liker) => liker.toString() !== userId
        );
        comment.likes -= 1;
        await comment.save();

        return res.status(200).json({
          message: "Like removed successfully",
          likesCount: comment.likes,
          likedBy: comment.likedBy,
        });
      } else {
        return res
          .status(400)
          .json({ message: "postId or commentId is required" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  getPostLikes: async (req, res) => {
    const { postId } = req.params;

    try {
      const post = await Post.findById(postId).populate("likedBy", "userName");
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({
        likesCount: post.likes,
        likedBy: post.likedBy,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  getCommentsLikes: async (req, res) => {
    const { commentId } = req.params;

    try {
      const comment = await Comment.findById(commentId).populate(
        "likedBy",
        "userName"
      );

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json({
        likesCount: comment.likes,
        likedBy: comment.likedBy,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = likesController;
