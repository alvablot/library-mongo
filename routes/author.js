const express = require("express");
const author = require("../models/author");
const router = express.Router();
const Author = require("../models/author");

router.get("/user", (req, res) => {
    res.send("Hello user!");
    console.log("GET/user");
});

const myAuthor = new Author({ name: "Olle" });

// myAuthor.save((err) => {
//     console.log(myAuthor);
//     if (err) {
//         console.error(err);
//     }
// });

router.get("/", async (req, res) => {
    const authors = await Author.find({});
    res.json(authors);
    console.log("GET/all authors");
});

router.post("/new", (req, res) => {
    res.send("Create user");
    console.log("POST/new");
});

module.exports = router;
