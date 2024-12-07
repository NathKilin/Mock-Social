const cloudinary = require("cloudinary").v2;
const Post = require("../models/postModel.js");
const mongoose = require("mongoose");

const postController = {
  // Create a new post
  createPost: async (req, res) => {
    try {
      const { caption, url } = req.body;
      const authorId = req.userID; // Assumes userID is passed in middleware
      if (!url) {
        return res.status(400).json({ message: "Image URL is required" });
      }

      const newPost = new Post({
        url,
        caption,
        authorId,
      });

      const savedPost = await newPost.save();
      res
        .status(201)
        .json({ message: "Post created successfully", data: savedPost });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error creating post", error: error.message });
    }
  },

  // Get all posts
  getAllPosts: async (req, res) => {
    try {
      console.log("in get all posts");
      const posts = await Post.find()
        .populate({
          path: "authorId",
          select: { userName: 1, profileImage: 1 },
        }) // Populate author details
        .populate({
          path: "comments",
          populate: {
            path: "authorId",
            select: { userName: 1, profileImage: 1 },
          },
        }) // Populate comments
        .populate("likedBy", "userName");

      res.status(200).json(posts);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching posts", error: error.message });
    }
  },

  // Retrieve a specific post by ID
  getPostById: async (req, res) => {
    try {
      const { postId } = req.params;

      const post = await Post.findById(postId)
        .populate("authorId", "userName")
        .populate("comments", "authorId likedBy text")
        .populate("likedBy", "userName");

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(post);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching post", error: error.message });
    }
  },

  // Update a post
  updatePost: async (req, res) => {
    try {
      // const authorId = req.userID;
      const { postId } = req.params;
      const { url, caption, authorId } = req.body;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Check if the requesting user is the author of the post
      if (post.authorId.toString() !== authorId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to edit this post" });
      }

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { url, caption },
        { new: true } // Ensures the updated document is returned
      );
      res
        .status(200)
        .json({ message: "Post updated successfully", data: updatedPost });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating post", error: error.message });
    }
  },

  // Delete a post
  deletePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const { authorId } = req.body;
      // const authorId = req.userID;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Check if the requesting user is the author of the post
      if (post.authorId.toString() !== authorId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this post" });
      }

      await Post.findByIdAndDelete(postId);

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting post", error: error.message });
    }
  },
};

module.exports = postController;
