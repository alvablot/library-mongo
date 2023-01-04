const express = require("express");

const md5 = require("md5");
const jwt = require("jsonwebtoken");
let token = false;
let activeUser = {};

const router = express.Router();
const User = require("../models/user");

router.get("/me", (req, res, next) => {
    res.send("Hello user!");
    console.log("GET/user");
});

router.get("/", async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
        console.log("GET/all users");
    } catch (error) {
        return next(error);
    }
});

router.post("/new", express.json(), async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({ Message: "User already exists" });
        }

        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: md5(req.body.password),
            email: req.body.email,
        });

        const users = await User.find({});
        res.json(users);

        console.log("POST/new user");
    } catch (error) {
        return next(error);
    }
});

router.post("/login", express.json(), async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ Message: "Password or email missing" });

        const existingUser = await User.findOne({ email: email });

        // if (existingUser === undefined) return 404;
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
        
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
