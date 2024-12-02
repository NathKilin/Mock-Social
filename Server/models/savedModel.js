const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Array,
    default: "",
  },
});

module.exports = mongoose.model("Saved", savedSchema);
