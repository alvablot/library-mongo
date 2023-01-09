const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    id: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  categories: [
    {
      type: String,
    },
  ],
  rating: {
    type: Number,
    required: false,
  },
  home: {
    type: Boolean,
    required: false,
  },
  lender: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Item", itemSchema);
