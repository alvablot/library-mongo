const express = require("express");

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
        password: req.body.password,
        email: req.body.email,
    });

    const users = await User.find({});
    res.json(users);

    console.log("POST/new user");
});

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await User.deleteOne({ _id: id });

    const users = await User.find({});
    res.json(users);
    console.log(`DELETE/user ${id}`);
});

module.exports = router;
