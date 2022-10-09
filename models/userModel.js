const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
    password: {
      type: String,
      require,
    },
    username: {
      type: String,
      require,
    },
    profilePic:{
      type:String,
      require
    },
    email: {
      type: String,
      require,
    },
    dob: {
      type: Date,
      require,
    },
    bio: {
      type: String,
      require,
    },
    isAdmin: {
      type: Boolean,
      require,
      default: false,
    },
    isVerified: {
      type: Boolean,
      require,
      default: false,
    },
    followers: {
      type: Array,
    },
    following: {
      type: Array,
    },
    posts: {
      type: Array,
    },
    likedPosts: {
      type: Array,
    },
    commentedPosts: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
