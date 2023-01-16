const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    id: String,
    required: false,
  },
  number: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
    required: true,
  },
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
  dateCreated: {
    type: Date,
    required: true,
  }
  ,
  dateLoan: {
    type: Date,
    required: false,
  }
  ,
  dateReturn: {
    type: Date,
    required: false,
  }
});

module.exports = mongoose.model("Item", itemSchema);
