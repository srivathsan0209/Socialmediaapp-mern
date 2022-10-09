const express = require("express");
const Post = require("../models/postModel");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", (req, res) => {
  User.find({ email: req.body.email }, (err, docs) => {
    if (docs.length > 0) {
      return res.status(400).json({ message: "Email Already taken" });
    } else {
      User.find({ username: req.body.username }, (error, documents) => {
        if (documents.length > 0) {
          return res.status(400).json({ message: "Username Already taken" });
        } else {
          const newuser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            profilePic: req.body.profilePic,
            dob: req.body.dob,
            bio: req.body.bio,
          });
          newuser.save((err) => {
            if (!err) {
              res.send("User Registration Success");
            } else {
              res.send("Something went wrong");
            }
          });
        }
      });
    }
    if (err) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
});

router.post("/login", (req, res) => {
  User.find(
    { email: req.body.email, password: req.body.password },
    (err, docs) => {
      if (docs.length > 0) {
        console.log("docs", docs);
        const user = {
          name: docs[0].name,
          _id: docs[0]._id,
          username: docs[0].username,
          profilePic: docs[0].profilePic,
          email: docs[0].email,
          dob: docs[0].dob,
          bio: docs[0].bio,
          isAdmin: docs[0].isAdmin,
          isVerified: docs[0].isVerified,
          followers: docs[0].followers,
          following: docs[0].following,
          posts: docs[0].posts,
          likedPosts: docs[0].likedPosts,
          commentedPosts: docs[0].commentedPosts,
        };
        res.send(user);
      } else {
        console.log(err);
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    }
  );
});

router.post("/getuserbyusername", (req, res) => {
  User.find({ username: req.body.username }, (err, docs) => {
    if (docs.length > 0) {
      const user = {
        name: docs[0].name,
        _id: docs[0]._id,
        username: docs[0].username,
        profilePic: docs[0].profilePic,
        email: docs[0].email,
        dob: docs[0].dob,
        bio: docs[0].bio,
        isAdmin: docs[0].isAdmin,
        isVerified: docs[0].isVerified,
        followers: docs[0].followers,
        following: docs[0].following,
        posts: docs[0].posts,
      };
      res.send(user);
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  });
});

router.post("/getallusersbyusername", (req, res) => {
  User.find({ username: { $regex: req.body.username } }, (err, docs) => {
    if (docs.length > 0) {
      const user = [];
      for (const doc of docs) {
        user.push({
          name: doc.name,
          _id: doc._id,
          username: doc.username,
          profilePic: doc.profilePic,
          email: doc.email,
          dob: doc.dob,
          bio: doc.bio,
          isAdmin: doc.isAdmin,
          isVerified: doc.isVerified,
          followers: doc.followers,
          following: doc.following,
          posts: doc.posts,
        });
      }
      res.send(user);
    } else {
      console.log(err);
      return res.status(400).json({ message: "No Results found" });
    }
  });
});

router.post("/follow", (req, res) => {
  const { currentUser, profile, username } = req.body;
  if (
    profile.followers.includes(currentUser.username) &&
    currentUser.following.includes(username)
  ) {
    const followerIndex = profile.followers.indexOf(currentUser.username);
    profile.followers.splice(followerIndex, 1);
    const followingIndex = currentUser.following.indexOf(username);
    currentUser.following.splice(followingIndex, 1);
    console.log("removed");
  } else if (
    !profile.followers.includes(currentUser.username) &&
    !currentUser.following.includes(username)
  ) {
    currentUser.following.push(username);
    profile.followers.push(currentUser.username);
    console.log("added");
  }

  User.findByIdAndUpdate(
    currentUser._id,
    {
      following: currentUser.following,
    },
    { returnDocument: "after" },
    (err, docs) => {
      if (err) {
        return res.status(400).json({ message: "Something Went wrong" });
      } else {
        // return res.send("Following User details Updated Successfully")
        console.log("List one updated");
        User.findByIdAndUpdate(
          profile._id,
          {
            followers: profile.followers,
          },
          { returnDocument: "after" },
          (error, document) => {
            if (error) {
              return res.status(400).json({ message: "Something Went wrong" });
            } else {
              console.log("List two updated");
              const currentUserUpdated = {
                name: docs.name,
                _id: docs._id,
                username: docs.username,
                profilePic: docs.profilePic,
                email: docs.email,
                dob: docs.dob,
                bio: docs.bio,
                isAdmin: docs.isAdmin,
                isVerified: docs.isVerified,
                followers: docs.followers,
                following: docs.following,
                posts: docs.posts,
                likedPosts: docs.likedPosts,
              };
              const profileUpdated = {
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
              // console.log(profileUpdated)
              const result = {
                currentUserUpdated: currentUserUpdated,
                profileUpdated: profileUpdated,
              };
              // res.send("Users details Updated Successfully");
              return res.json(result);
            }
          }
        );
      }
    }
  );
});

router.post("/getalluserdetailsbyusername", (req, res) => {
  const usernameList = req.body.usernamesList;
  // console.log(usernameLists)
  let users = [];
  for (const username of usernameList) {
    // console.log(username)
    User.find({ username: username }, (err, docs) => {
      // console.log(docs);
      if (!err) {
        if (docs.length > 0) {
          users.push({
            name: docs[0].name,
            _id: docs[0]._id,
            username: docs[0].username,
            profilePic: docs[0].profilePic,
          });
        }
      } else {
        res.send("Something went wrong");
      }
    });
  }
  // console.log("final users", users);
  setTimeout(() => {
    res.json(users);
  }, 2000);
});

router.get("/getallusers", (req, res) => {
  User.find({}, (err, docs) => {
    if (err) {
      return res.status(400).json({ message: "Something Went wrong" });
    } else {
      res.send(docs);
    }
  });
});

router.post("/update", (req, res) => {
  const { userid, updateduser } = req.body;
  // console.log(updateduser);
  User.findByIdAndUpdate(
    userid,
    {
      name: updateduser.name,
      email: updateduser.email,
      username: updateduser.username,
      profilePic: updateduser.profilePic,
      dob: updateduser.dob,
      bio: updateduser.bio,
    },
    { returnDocument: "after" },
    (err, docs) => {
      if (err) {
        return res.status(400).json({ message: "Something Went wrong" });
      } else {
        console.log(docs);
        return res.send(docs);
      }
    }
  );
});

router.post("/changePassword", async (req, res) => {
  const { userid, oldPassword, newPassword } = req.body;

  const user = await User.findById({ _id: userid });

  console.log(user);

  if (user.password === oldPassword) {
    User.findByIdAndUpdate(
      userid,
      {
        password: newPassword,
      },
      (err, docs) => {
        if (err) {
          return res.status(400).json({ message: "Something Went wrong" });
        } else {
          return res.send("Password Updated Successfully");
        }
      }
    );
  } else {
    return res.status(400).json({ message: "Wrong Password" });
  }
});

//Delete User Error
router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  console.log("userid", userid);
  const user = await User.findById({ _id: userid });
  const userFollowers = user.followers;
  const userFollowing = user.following;
  const userLikedPosts = user.likedPosts;
  const userCommentedPosts = user.commentedPosts;
  const userPosts = user.posts;

  let userFollowersUpdated = userFollowers.length > 0 ? false : true;
  let userFollowingUpdated = userFollowing.length > 0 ? false : true;
  let userLikedPostsUpdated = userLikedPosts.length > 0 ? false : true;
  let userCommentedPostsUpdated = userCommentedPosts.length > 0 ? false : true;
  let userPostsUpdated = userPosts.length > 0 ? false : true;

  console.log("userFollowers", userFollowers);
  console.log("userFollowing", userFollowing);
  console.log("userLikedPosts", userLikedPosts);
  console.log("userCommentedPosts", userCommentedPosts);
  console.log("userPosts", userPosts);
  //Delete Post functionality Error

  //try async await or take a document and perform all the operations

  // If a postid is removed from the userLikedPosts it is showing,
  //while fetching the document for userCommentedPosts this should be fixed
  //we should wait till the old document finishes updating

  if (userFollowers.length > 0) {
    for (const username of userFollowers) {
      setTimeout(async () => {
        const followerUser = await User.findOne({ username: username });
        console.log("user before userFollower", followerUser);
        if (followerUser.following.includes(user.username)) {
          const index = followerUser.following.indexOf(user.username);
          followerUser.following.splice(index, 1);
          console.log("user after userFollower", followerUser);
          // res.setHeader("Content-Type", "application/json");
          followerUser.save((err, docs) => {
            if (err) {
              console.log("Line 340", err);
              return res.status(400).send("Something Went wrong");
            } else {
              console.log("Line 343", docs);
            }
          });
        }
      }, 500);
    }
  }

  if (userFollowing.length > 0) {
    for (const username of userFollowing) {
      setTimeout(async () => {
        const followingUser = await User.findOne({ username: username });
        console.log("user before userFollowing", followingUser);
        if (followingUser.followers.includes(user.username)) {
          const index = followingUser.followers.indexOf(user.username);
          followingUser.followers.splice(index, 1);
          console.log("user after userFollowing", followingUser);
          // res.setHeader("Content-Type", "application/json");
          followingUser.save((err, docs) => {
            if (err) {
              console.log("Line 363", err);
              return res.status(400).send("Something Went wrong");
            } else {
              console.log("Line 366", docs);
            }
          });
        }
      }, 500);
    }
  }

  if (userLikedPosts.length > 0) {
    for (const postid of userLikedPosts) {
      setTimeout(async () => {
        const likedPost = await Post.findById({ _id: postid });
        console.log("Post before userLikedPosts", likedPost);
        if (likedPost.likes.includes(user.username)) {
          const index = likedPost.likes.indexOf(user.username);
          likedPost.likes.splice(index, 1);
          console.log("Post After userLikedPosts", likedPost);
          // res.setHeader("Content-Type", "application/json");
          likedPost.save((err, docs) => {
            if (err) {
              console.log("Line 386", err);
              return res.status(400).send("Something Went wrong");
            } else {
              console.log("Line 389", docs);
            }
          });
        }
      }, 500);
    }
  }

  if (userCommentedPosts.length > 0) {
    for (const postid of userCommentedPosts) {
      setTimeout(async () => {
        const commentedPost = await Post.findById({ _id: postid });
        console.log("Post before userCommentedPosts", commentedPost);
        if (commentedPost.comments.includes(user.username)) {
          const index = commentedPost.comments.indexOf(user.username);
          commentedPost.comments.splice(index, 1);
          console.log("Post After userCommentedPosts", commentedPost);
          // res.setHeader("Content-Type", "application/json");
          commentedPost.save((err, docs) => {
            if (err) {
              console.log("Line 409", err);
              return res.status(400).send("Something Went wrong");
            } else {
              console.log("Line 412", docs);
            }
          });
        }
      }, 500);
    }
  }

  if (userPosts.length > 0) {
    for (const post of userPosts) {
      // const user = await User.find({ username: username });

      // const userpostsIndex = user[0].posts.indexOf(postid);
      // user[0].posts.splice(userpostsIndex, 1);

      // if (user[0].likedPosts.includes(postid)) {
      //   const userlikedpostsIndex = user[0].likedPosts.indexOf(postid);
      //   user[0].likedPosts.splice(userlikedpostsIndex, 1);
      // }

      // user[0].save((err, docs) => {
      //   if (err) {
      //     res.status(400).send("Something Went wrong");
      //   } else {
      //     console.log(docs);
      //   }
      // });

      const postid = post.toString();

      const likedUsers = await User.find({ likedPosts: postid });
      console.log("likedPosts user", likedUsers);
      if (likedUsers.length > 0) {
        for (const user of likedUsers) {
          setTimeout(async () => {
            console.log("likedUsers Before", user.username, user.likedPosts);
            if (user.likedPosts.includes(postid)) {
              const userLikedpostsIndex = user.likedPosts.indexOf(postid);
              user.likedPosts.splice(userLikedpostsIndex, 1);
              console.log("likedUsers After", user.username, user.likedPosts);
              // res.setHeader("Content-Type", "application/json");
              user.save((err, docs) => {
                if (err) {
                  console.log("Line 455", err);
                  return res.status(400).send("Something Went wrong");
                } else {
                  console.log("Line 458", docs);
                }
              });
            }
          }, 500);
        }
      }

      const commentedUsers = await User.find({ commentedPosts: postid });
      console.log("Commented user", commentedUsers);
      if (commentedUsers.length > 0) {
        for (const user of commentedUsers) {
          setTimeout(async () => {
            console.log(
              "commentedUsers Before",
              user.username,
              user.commentedPosts
            );
            if (user.commentedPosts.includes(postid)) {
              const userCommentedpostsIndex =
                user.commentedPosts.indexOf(postid);
              user.commentedPosts.splice(userCommentedpostsIndex, 1);
              console.log(
                "commentedUsers After",
                user.username,
                user.commentedPosts
              );
              // res.setHeader("Content-Type", "application/json");
              user.save((err, docs) => {
                if (err) {
                  console.log("Line 488", err);
                  return res.status(400).send("Something Went wrong");
                } else {
                  console.log("Line 491", docs);
                }
              });
            }
          }, 500);
        }
      }

      setTimeout(async () => {
        Post.findByIdAndRemove({ _id: postid }, (err, docs) => {
          // res.setHeader("Content-Type", "application/json");
          if (err) {
            console.log("Line 503", err);
            return res.status(400).send("Something Went wrong");
          } else {
            console.log("Line 506", docs);
            // res.send("Post Deleted Successfully");
          }
        });
      }, 500);
    }
  }

  setTimeout(async () => {
    User.findByIdAndRemove(req.body.userid, (err) => {
      // res.setHeader("Content-Type", "application/json");
      if (err) {
        console.log("Line 518", err);
        return res.status(400).json({ message: "Something Went wrong" });
      } else {
        res.send("User Deleted Successfully");
      }
    });
  }, 500);
});

router.post("/getsingleuserdetail", (req, res) => {
  const username = req.body.username;
  User.find({ username: username }, (err, docs) => {
    // console.log(docs);
    if (!err) {
      const userDetail = {
        name: docs[0].name,
        _id: docs[0]._id,
        username: docs[0].username,
        profilePic: docs[0].profilePic,
      };
      res.send(userDetail);
    } else {
      res.send("Something went wrong");
    }
  });
});

module.exports = router;
