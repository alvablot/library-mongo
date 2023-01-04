const express = require("express");
const author = require("../models/author");
const router = express.Router();
const Author = require("../models/author");

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const authors = await Author.find({ _id: id });
    res.json(authors);

    console.log("GET/author");
});

router.get("/", async (req, res) => {
    const authors = await Author.find({});
    res.json(authors);
    console.log("GET/all authors");
});

router.post("/new", express.json(), async (req, res) => {
    const newAuthor = await Author.create({
        name: req.body.name,
        rating: req.body.rating,
        categories: req.body.categories,
    });

    const authors = await Author.find({});
    res.json(authors);

    console.log("POST/new author");
});

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Author.deleteOne({ _id: id });

    const authors = await Author.find({});
    res.json(authors);
    console.log(`DELETE/author ${id}`);
});

module.exports = router;
