const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  subs: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Category", categoriesSchema);
