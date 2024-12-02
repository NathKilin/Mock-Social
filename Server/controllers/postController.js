const Post = require("../models/postModel.js");
const mongoose = require("mongoose");

const postController = {
  // Create a new post
  createPost: async (req, res) => {
    try {
      const { caption } = req.body;
      const authorId = req.userID;
      console.log("in server");

      // Get the uploaded image URL from Cloudinary (added by the middleware)
      const imageUrl = req.file ? req.file.path : null;

      // Create a new post object
      const newPost = new Post({
        url: imageUrl, // Save the image URL
        authorId,
        caption,
      });
      // console.log(newPost);

      const savedPost = await newPost.save();

      res
        .status(201)
        .json({ message: "Post created successfully", data: savedPost });
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(error.name);
      res
        .status(500)
        .json({ message: "Error creating post", error: error.message });
    }
  },

  // Get all posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("authorId", "userName") // Populate author details
        .populate("comments", "text") // Populate comments
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
