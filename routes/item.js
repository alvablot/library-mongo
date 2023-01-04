const express = require("express");

const router = express.Router();
const Item = require("../models/item");

router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = await Item.findById(id);
        res.json(item);
        console.log(`GET/item ${id}`);
    } catch (error) {
        return next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const items = await Item.find({});
        res.json(items);
        console.log("GET/all items");
    } catch (error) {
        return next(error);
    }
});

router.post("/new", express.json(), async (req, res, next) => {
    try {
        const newItem = await Item.create({
            title: req.body.title,
            author: req.body.author,
            number: req.body.number,
            image: req.body.image,
            description: req.body.description,
            categories: req.body.categories,
            rating: req.body.rating,
            home: req.body.home,
        });

        const item = await Item.find({});
        res.json(item);

        console.log("POST/new item");
    } catch (error) {
        return next(error);
    }
});

router.put("/:id", express.json(), async (req, res, next) => {
    try {
        const id = req.params.id;
        const newItem = await Item.findByIdAndUpdate(id, {
            title: req.body.title,
            author: req.body.author,
            number: req.body.number,
            image: req.body.image,
            description: req.body.description,
            categories: req.body.categories,
            rating: req.body.rating,
            home: req.body.home,
        });

        const item = await Item.find({});
        res.json(item);

        console.log("POST/new item");
    } catch (error) {
        return next(error);
    }
});

router.delete("/delete/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        await Item.findByIdAndRemove(id);
        const items = await Item.find({});
        res.json(items);
        console.log(`DELETE/item ${id}`);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
