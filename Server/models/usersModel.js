const mongoose = require("mongoose");

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  // ?QUERY: add require to role? we need role but updete not chenge it ?
  role: {
    type: String,
    enum: ["super admin", "admin", "user", "moderator", "editor"],
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { phone: true });

//todo: virtual filed for fullName

module.exports = mongoose.model("User", userSchema);
