const Post = require("../models/postModel.js");

const postController = {
  // Create a new post
  createPost: async (req, res) => {
    try {
      const { url, caption } = req.body;
      // const authorId = req.body.userID;

      console.log(req.role);

      // data to be inserted via body
      const newPost = new Post({
        url,
        authorId,
        caption,
      });

      const savedPost = await newPost.save();
      res
        .status(201)
        .json({ message: "Post created successfully", data: savedPost });
    } catch (error) {
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
      const { id } = req.params;
      console.log("Received Post ID:", id);

      const post = await Post.findById(id)
        .populate("authorId", "userName")
        .populate("comments")
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
      const { id } = req.params;
      const { url, caption } = req.body;

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { url, caption },
        { new: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

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
      const { id } = req.params;

      const deletedPost = await Post.findByIdAndDelete(id);

      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting post", error: error.message });
    }
  },
};

module.exports = postController;
