const express = require("express");
const router = express.Router();

const Item = require("../models/item");

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);

    res.json(item);
    console.log(`GET/item ${id}`);
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.json(items);
    console.log("GET/all items");
    next();
  } catch (error) {
    return next(error);
  }
});

router.post("/new", express.json(), async (req, res, next) => {
  try {
    const {
      title,
      author,
      number,
      image,
      description,
      categories,
      category,
      sub,
      rating,
      home,
      lender,
    } = req.body;

    const existingItem = await Item.findOne({ title: title });

    if (existingItem) {
      return res.json({ Message: "User already exists" });
    }

    const newItem = await Item.create({
      title: title,
      author: author,
      number: number,
      image: image,
      description: description,
      categories: categories,
      category: category,
      sub: sub,
      rating: rating,
      home: home,
      lender: lender,
    });

    // const item = await Item.find({});
    const item = await Item.findOne({ title: title });
    res.json(item);

    console.log("POST/new item");
    next();
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      title,
      author,
      number,
      image,
      description,
      categories,
      category,
      sub,
      rating,
      home,
      lender,
    } = req.body;
    const freshItem = await Item.findByIdAndUpdate(id, {
      title: title,
      author: author,
      number: number,
      image: image,
      description: description,
      category: category,
      sub: sub,
      rating: rating,
      home: home,
      lender: lender,
    });

    const item = await Item.find({});
    res.json(item);

    console.log("PUT/update item");
    next();
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id", express.json(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const { home, lender } = req.body;
    const freshItem = await Item.findByIdAndUpdate(id, {
      home: home,
      lender: lender,
    });

    const item = await Item.find({});
    res.json(item);

    console.log("PATCH/update item");
    next();
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const item = await Item.findById(id);
    await Item.findByIdAndRemove(id);
    const items = await Item.find({});
    res.json(item);
    console.log(`DELETE/item ${id}`);

    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
