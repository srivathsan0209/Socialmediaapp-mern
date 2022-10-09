const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    userid: {
      type: String,
      require,
    },
    comments: {
      type: String,
      require,
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require,
    },
    comment: {
      type: String,
      require,
    },
    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    imageUrl: {
      type: String,
      require,
    },
    userComment: {
      type: String,
      require,
    },
    postedby: {
      type: String,
      require,
    },
    likes: {
      type: Array,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts",postSchema);

module.exports = Post;
