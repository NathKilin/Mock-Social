const Comment = require("../models/commentModel.js");
const Post = require("../models/postModel.js");
const mongoose = require("mongoose");

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
      res
        .status(201)
        .json({ message: "comment created successfully", data: savedComment });
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
        .populate("postId", "id")
        .populate("authorId", "_id") // Populate author details
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
      const { commentId } = req.params;

      const comment = await Comment.findById(commentId)
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
      // const authorId = req.userID;
      const { commentId } = req.params;
      const { text, authorId } = req.body;

      if (!text) {
        return res
          .status(400)
          .json({ message: "Text is required to update the comment" });
      }

      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Check if the requesting user is the author of the Comment
      if (comment.authorId.toString() !== authorId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to edit this Comment" });
      }

      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { text },
        { new: true }
      );

      res.status(200).json({
        message: "comment updated successfully",
        data: updatedComment,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating comment", error: error.message });
    }
  },

  // Delete comment
  deleteComment: async (req, res) => {
    try {
      const { commentId } = req.params;
      // const { authorId } = req.body;
      const authorId = req.userID;

      const comment = await Comment.findById(commentId);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Check if the requesting user is the author of the comment
      // if (comment.authorId.toString() !== authorId) {
      //   return res
      //     .status(403)
      //     .json({ message: "You are not authorized to delete this comment" });
      // }

      await Comment.findByIdAndDelete(commentId);

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting comment", error: error.message });
    }
  },
};

module.exports = commentsController;
