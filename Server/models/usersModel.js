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
    // select: false,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
    // select: false,
  },

  role: {
    type: String,
    enum: ["user", "editor", "moderator", "admin", "super admin", "elchanan"],
    default: "user",
    select: false,
  },

  profileImage: {
    type: String,
    default:
      "https://files.oaiusercontent.com/file-JUQ2DU1tkmMTvkyd5j54Xt?se=2024-12-08T08%3A41%3A46Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D53f18caf-b073-499a-aaf6-a2c4fb5bec85.webp&sig=Vpv7emoXfuQxrDMoh4wjkJbaea4qhLMovda4wDRK95E%3D",
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      addedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  userComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  userPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  password: {
    type: String,
    required: true,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("friendsCount").get(function () {
  return this.friends?.length;
});

// to enable virtuales
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { phone: true });
userSchema.index({ userName: 1 }, { userName: true });

module.exports = mongoose.model("User", userSchema);
