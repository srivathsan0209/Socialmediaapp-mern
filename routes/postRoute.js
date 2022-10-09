const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");
const User = require("../models/userModel");

router.post("/addpost", (req, res) => {
  const newpost = new Post({
    imageUrl: req.body.imageUrl,
    userComment: req.body.userComment,
    postedby: req.body.postedby,
  });
  newpost.save((err, docs) => {
    console.log(docs);
    if (!err) {
      const posts = req.body.posts;
      posts.push(docs._id);

      User.findByIdAndUpdate(
        req.body._id,
        {
          posts: posts,
        },
        { returnDocument: "after" },
        (error, document) => {
          if (error) {
            return res.status(400).json({ message: "Something Went wrong" });
          } else {
            return res.json(document);
          }
        }
      );
    } else {
      res.send("Something went wrong");
    }
  });
});

router.post("/getpostanduserbyid", (req, res) => {
  const id = req.body.postid;
  let details = {};
  Post.findById(id, (err, docs) => {
    if (!err) {
      details.post = docs;
      User.findOne({ username: docs.postedby }, (error, documents) => {
        if (error) {
          res.send("Something went wrong");
        } else {
          const user = {
            profilePic: documents.profilePic,
            name: documents.name,
            username: documents.username,
          };
          details.user = user;
          res.send(details);
        }
      });
    } else {
      res.send("Something went wrong");
    }
  });
});

router.post("/getpostsbyusername", (req, res) => {
  const username = req.body.username;
  Post.find({ postedby: username }, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.send("Something went wrong");
    }
  });
});

// router.post("/getfeedpostsbyusername", (req, res) => {
//   const usernameLists = req.body.username;
//   let posts = [];
//   for (const username of usernameLists) {
//     Post.find({ postedby: username }, (err, docs) => {
//       if (!err) {
//         if (docs.length > 0) {
//           for (const doc of docs) {
//             posts.push({
//               imageUrl: doc.imageUrl,
//               _id: doc._id,
//               userComment: doc.userComment,
//               postedby: doc.postedby,
//               likes: doc.likes,
//               comments: doc.comments,
//               createdAt: doc.createdAt,
//             });
//           }
//         }
//       } else {
//         res.send("Something went wrong");
//       }
//     });
//   }
//   setTimeout(() => {
//     res.json(posts);
//   }, 2000);
// });

router.post("/getfeedpostsbyusername", (req, res) => {
  const usernameLists = req.body.username;
  let posts = [];
  for (const username of usernameLists) {
    Post.find({ postedby: username }, (err, docs) => {
      if (!err) {
        if (docs.length > 0) {
          for (const doc of docs) {
            posts.push({
              _id: doc._id,
              createdAt: doc.createdAt,
            });
          }
        }
      } else {
        res.send("Something went wrong");
      }
    });
  }
  setTimeout(() => {
    res.json(posts);
  }, 2000);
});

router.post("/addcomment", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if(!user.commentedPosts.includes(req.body.postid)){
    user.commentedPosts.push(req.body.postid);
  }
  user.save((err, docs) => {
    if (err) {
      return res.status(400).json({ message: "Something Went wrong" });
    } else {
      console.log(docs);
    }
  });

  const post = await Post.findById({ _id: req.body.postid });
  const commentModel = {
    username: req.body.username,
    comment: req.body.comment,
  };
  post.comments.push(commentModel);
  post.save((err, docs) => {
    if (err) {
      return res.status(400).json({ message: "Something Went wrong" });
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
});

router.post("/likepost", async (req, res) => {
  const { username, postid, userid } = req.body;

  const post = await Post.findById({ _id: postid });
  const user = await User.findById({ _id: userid });

  if (post.likes.includes(username) && user.likedPosts.includes(postid)) {
    const usernameIndex = post.likes.indexOf(username);
    post.likes.splice(usernameIndex, 1);
    const postIndex = user.likedPosts.indexOf(postid);
    user.likedPosts.splice(postIndex, 1);
  } else if (
    !post.likes.includes(username) &&
    !user.likedPosts.includes(postid)
  ) {
    post.likes.push(username);
    user.likedPosts.push(postid);
  }
  post.save((err, docs) => {
    if (err) {
      return res.status(400).json({ message: "Something Went wrong" });
    } else {
      user.save((error, document) => {
        if (error) {
          return res.status(400).json({ message: "Something Went wrong" });
        } else {
          const userProfile = {
            name: document.name,
            _id: document._id,
            username: document.username,
            profilePic: document.profilePic,
            email: document.email,
            dob: document.dob,
            bio: document.bio,
            isAdmin: document.isAdmin,
            isVerified: document.isVerified,
            followers: document.followers,
            following: document.following,
            posts: document.posts,
            likedPosts: document.likedPosts,
          };
          const result = {
            post: docs,
            user: userProfile,
          };
          // console.log(result)
          return res.json(result);
        }
      });
    }
  });
});

// router.post("/getuserlikedposts", (req, res) => {
//   const likedPostsList = req.body.likedPostsList;
//   // console.log(likedPostsList)
//   let posts = [];
//   for (const likedPost of likedPostsList) {
//     // console.log(username)
//     Post.findById({ _id: likedPost }, (err, docs) => {
//       // console.log(docs);
//       if (!err) {
//         if (docs) {
//           posts.push({
//             imageUrl: docs.imageUrl,
//             _id: docs._id,
//             userComment: docs.userComment,
//             postedby: docs.postedby,
//             likes: docs.likes,
//             comments: docs.comments,
//             createdAt: docs.createdAt,
//           });
//         }
//       } else {
//         console.log(err);
//         res.send("Something went wrong");
//       }
//     });
//   }
//   // console.log("final users", users);
//   setTimeout(() => {
//     console.log(posts);
//     res.json(posts);
//   }, 2000);
// });

router.post("/getuserlikedposts", (req, res) => {
  const likedPostsList = req.body.likedPostsList;
  // console.log(likedPostsList)
  let posts = [];
  for (const likedPost of likedPostsList) {
    // console.log(username)
    Post.findById({ _id: likedPost }, (err, docs) => {
      // console.log(docs);
      if (!err) {
        if (docs) {
          posts.push({
            _id: docs._id,
            createdAt: docs.createdAt,
          });
        }
      } else {
        console.log(err);
        res.send("Something went wrong");
      }
    });
  }
  // console.log("final users", users);
  setTimeout(() => {
    console.log(posts);
    res.json(posts);
  }, 2000);
});

router.post("/deletepost", async (req, res) => {
  const postid = req.body.postid;
  console.log(postid);
  const user = await User.find({ username: req.body.username });

  const userpostsIndex = user[0].posts.indexOf(postid);
  user[0].posts.splice(userpostsIndex, 1);

  if (user[0].likedPosts.includes(postid)) {
    const userlikedpostsIndex = user[0].likedPosts.indexOf(postid);
    user[0].likedPosts.splice(userlikedpostsIndex, 1);
  }

  console.log(user[0]);

  user[0].save((err, docs) => {
    if (err) {
      res.status(400).send("Something Went wrong");
    } else {
      console.log(docs);
    }
  });

  const users = await User.find({ likedPosts: postid });
  // console.log(users);
  for (const user of users) {
    // console.log(user.username, user.likedPosts);
    const userLikedpostsIndex = user.likedPosts.indexOf(postid);
    user.likedPosts.splice(userLikedpostsIndex, 1);
    // res.setHeader("Content-Type", "application/json");
    user.save((err, docs) => {
      if (err) {
        return res.status(400).send("Something Went wrong");
      } else {
        console.log(docs);
      }
    });
  }

  const commentedUsers = await User.find({ commentedPosts: postid });
  console.log(commentedUsers);
  for (const user of commentedUsers) {
    const userCommentedpostsIndex = user.commentedPosts.indexOf(postid);
    user.commentedPosts.splice(userCommentedpostsIndex, 1);
    res.setHeader("Content-Type", "application/json");
    user.save((err, docs) => {
      if (err) {
        return res.status(400).send("Something Went wrong");
      } else {
        console.log(docs);
      }
    });
  }

  Post.findByIdAndRemove(postid, (err, docs) => {
    // res.setHeader("Content-Type", "application/json");
    if (err) {
      return res.status(400).send("Something Went wrong");
    } else {
      console.log(docs);
      res.send("Post Deleted Successfully");
    }
  });
});

// router.post("/removecomment", async (req, res) => {
//   const commentedPost = await Post.findById({ _id : req.body.postid });
//   console.log(commentedPost)
//   const index = commentedPost.comments.indexOf(req.body.username);
//   commentedPost.comments.splice(index, 1);
//   commentedPost.save((err, docs) => {
//     if (err) {
//       return res.status(400).send("Something Went wrong");
//     } else {
//       console.log(docs);
//       return res.send(docs);
//     }
//   });
// });

// router.get("/getallposts", (req, res) => {
//   Post.find({},(err, docs) => {
//     console.log(docs);
//     if (!err) {
//       res.send(docs);
//     } else {
//       res.send("Something went wrong");
//     }
//   });
// });

module.exports = router;
