const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");

const User = require("../model/user");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");

// login for admin
const admin = [
  { email: "admin@gmail.com", password: "admin@123", userType: "admin" },
];

router.get("/admin-panel", checkAuth, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(201).json({
      result: users,
    });
  } catch (error) {
    return res.status(500).json({
      err: error,
    });
  }
});

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        password: hash,
        email: req.body.email,
      });
      user
        .save()
        .then((result) => {
          res.status(200).json({
            new_user: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Email already exist",
            error: err,
          });
        });
    }
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "user not exist",
        });
      }

      console.log("userData", user);
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            msg: "password matching fail",
          });
        }
        if (result) {
          console.log("test", user);
          const token = jwt.sign(
            {
              email: user.email,
              password: user.password,
              userType: user.userType,
            },
            "this is dummy text",
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            email: user.email,
            password: user.password,
            userType: user.userType,

            token: token,
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
});

module.exports = router;
