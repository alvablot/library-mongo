const express = require("express");

const md5 = require("md5");
const jwt = require("jsonwebtoken");
let token = false;
let activeUser = {};

const router = express.Router();
const User = require("../models/user");

router.get("/me", (req, res) => {
    res.send("Hello user!");
    console.log("GET/user");
});

router.get("/", async (req, res) => {
    const users = await User.find({});
    res.json(users);
    console.log("GET/all users");
});

router.post("/new", express.json(), async (req, res) => {
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: md5(req.body.password),
        email: req.body.email,
    });

    const users = await User.find({});
    res.json(users);

    console.log("POST/new user");
});

router.post("/login", express.json(), async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return 400;

        const existingUser = await User.findOne({ email: email });

        // if (existingUser === undefined) return 404;
        const hashedPassword = md5(password);
        const checkPassword = hashedPassword === existingUser.password;

        if (!checkPassword) res.status(403).json({ Message: "Fuck off!" });

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

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await User.deleteOne({ _id: id });

    const users = await User.find({});
    res.json(users);
    console.log(`DELETE/user ${id}`);
});

module.exports = router;
