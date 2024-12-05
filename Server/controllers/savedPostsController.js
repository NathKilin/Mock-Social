const SavedPosts = require("../models/savedPostsModel.js");

const savedPostsController = {
  savePost: async (req, res) => {
    const userId = req.userID;
    const { postId } = req.params;

    try {
      if (!userId || !postId) {
        return res
          .status(400)
          .json({ massage: "User ID and Post ID are required." });
      }

      // Find or create the saved posts document for the user
      let saved = await SavedPosts.findOne({ userId });
      if (!saved) {
        saved = new SavedPosts({ userId, savedPosts: [] });
      }

      // Check if the user has already saved the post
      if (saved.savedPosts.includes(postId)) {
        return res.status(400).json({ message: "Post is already saved." });
      }

      // Add the post to savedPosts and save the document
      saved.savedPosts.push(postId);
      await saved.save();

      res.status(200).json({ message: "Post saved successfully.", saved });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  unsavePost: async (req, res) => {
    const userId = req.userID;
    const { postId } = req.params;

    try {
      if (!userId || !postId) {
        return res
          .status(400)
          .json({ massage: "User ID and Post ID are required." });
      }

      // Find the user's saved posts
      const saved = await SavedPosts.findOne({ userId });
      if (!saved) {
        return res.status(404).json({ message: "No saved posts found" });
      }

      // Check if the post is in the savedPosts array
      if (!saved.savedPosts.includes(postId)) {
        return res.status(400).json({ message: "Post is not saved" });
      }

      // Remove the post from the array
      saved.savedPosts = saved.savedPosts.filter(
        (id) => id.toString() !== postId
      );
      await saved.save();

      res.status(200).json({ message: "Post unsaved successfully", saved });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  getAllSavedPosts: async (req, res) => {
    const userId = req.userID;
    try {
      const savedPosts = await SavedPosts.find({ userId: userId })
        .populate("userId", "userName")
        .populate("savedPosts", "url caption");
      res.status(200).json(savedPosts);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching saved posts", error: error.message });
    }
  },
};

module.exports = savedPostsController;
