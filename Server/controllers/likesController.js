const Likes = require("../models/likesModel.js");

const likesController = {
  addLike: async (req, res) => {
    try {
    } catch (error) {
      console.log("error adding like:", error);
    }
  },

  removeLike: async (req, res) => {
    try {
    } catch (error) {
      console.log("error removing like:", error);
    }
  },

  countLikes: async (req, res) => {
    try {
    } catch (error) {
      console.log("error counting likes:", error);
    }
  },
};

module.exports = likesController;
