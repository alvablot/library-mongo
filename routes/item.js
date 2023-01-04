const express = require("express");

const router = express.Router();
const Item = require("../models/item");

router.get("/", (req, res) => {
    res.send("Hello item!");
    console.log("GET/user");
});

router.get("/all", async (req, res) => {
    const items = await Item.find({});
    res.json(items);
    console.log("GET/all items");
});

router.post("/new", express.json(), async (req, res) => {
    const newItem = await Item.create({
        title: req.body.title,
        author: req.body.author,
        number: req.body.number,
        image: req.body.image,
        description: req.body.description,
        rating: req.body.rating,
        home: req.body.home,
    });

    const items = await Item.find({});
    res.json(items);

    console.log("POST/new item");
});

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Item.deleteOne({ _id: id });

    const items = await Item.find({});
    res.json(items);
    console.log(`DELETE/items ${id}`);
});

module.exports = router;
