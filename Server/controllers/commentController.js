const Comment = require("../models/commentModel.js");
const Post = require("../models/postModel.js");

const commentsController = {
  // Create a new comment
  createComment: async (req, res) => {
    try {
      const { postId, text } = req.body;
      const authorId = req.userID;

      if (!postId || !text || !authorId) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newComment = new Comment({ postId, text, authorId });
      const savedComment = await newComment.save();
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      post.comments.push(savedComment._id);
      await post.save();
      res.status(201).json({ commentId: savedComment._id });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating comment", error: error.message });
    }
  },

  // Get all comments
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find()
        .populate("postId", "url caption") // Populate author details
        .populate("authorId", "userName email") // Populate author details
        .populate("likedBy", "userName");

      res.status(200).json(comments);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching comments", error: error.message });
    }
  },

  // Get comment by ID
  getCommentById: async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findById(id)
        .populate("postId", "url caption authorId")
        .populate("likedBy", "userName");

      if (!comment) {
        return res.status(404).json({ message: "comment not found" });
      }

      res.status(200).json(comment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching comment.", error: error.message });
    }
  },

  // Update comment
  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const { text } = req.body;

      if (!text) {
        return res
          .status(400)
          .json({ message: "Text is required to update the comment" });
      }

      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { text },
        { new: true, runValidators: true }
      );

      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json(updatedComment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating comment", error: error.message });
    }
  },

  // Delete comment
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedComment = await Comment.findByIdAndDelete(id);

      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting comment", error: error.message });
    }
  },
};

module.exports = commentsController;
