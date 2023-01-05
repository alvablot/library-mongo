const express = require("express");

const md5 = require("md5");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
let token = false;
let activeUser = {};

const router = express.Router();
const User = require("../models/user");

router.get("/me", auth, (req, res, next) => {
  try {
    res.json({ loggedInUser: req.user });
    console.log("GET/me");
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
    console.log("GET/all users");
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/new", express.json(), async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.json({ Message: "User already exists" });
    }

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      password: md5(password),
      email: email,
    });

    const users = await User.find({});
    res.json(users);

    console.log("POST/new user");
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/login", express.json(), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ Message: "Password or email missing" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser === null) return res.status(401).json({ Message: "User not found" });

    const hashedPassword = md5(password);
    const checkPassword = hashedPassword === existingUser.password;

    if (!checkPassword) return res.status(403).json({ Message: "Wrong password" });

    //////// INLOGGAD
    console.log("Right password");
    token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.SECRET_KEY
    );
    activeUser = {
      id: existingUser._id,
      password: hashedPassword,
    };
    res.json({ token: token });
    next();
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, email, password } = req.body;

    const freshUser = await User.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName,
      password: md5(password),
      email: email,
    });

    const user = await User.find({});
    res.json(user);

    console.log("PUT/update User");
    next();
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user === null) return res.status(401).json({ Message: "User doesn't exist" });

    await User.findByIdAndRemove(id);
    const users = await User.find({});
    res.json(users);
    console.log(`DELETE/User ${id}`);
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
