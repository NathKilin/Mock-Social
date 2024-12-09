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
    default: `https://res.cloudinary.com/dnow3xhka/image/upload/v1733697661/Social_Media_Posts/oqjr1rleuhhtgyg3c8mu.jpg`,
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

// to enable virtuales
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("friendsCount").get(function () {
  return this.friends?.length;
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { phone: true });
userSchema.index({ userName: 1 }, { userName: true });

module.exports = mongoose.model("User", userSchema);
