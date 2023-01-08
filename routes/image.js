const express = require("express");
const router = express.Router();
const fs = require("fs");
const upload = require("../middlewares/upload");
const Image = require("../models/image");

router.get("/", async (req, res, next) => {
  Image.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      // res.render("images", { items: items });
      res.json({ images: items });
    }
  });
});

router.post("/upload", upload.single("img"), (req, res, next) => {
  if (req.file === "undefined") return res.json({ Message: "Not a valid image" });
  const imgData = fs.readFileSync(req.file.path);
  const obj = {
    name: req.file.filename,
    desc: "Haj",
    img: {
      data: imgData,
      contentType: req.file.mimetype,
    },
  };
  Image.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ filename: req.file.filename, path: req.file.path });
    }
  });
});

module.exports = router;
