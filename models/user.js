const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  lastModified: {
    type: Date,
    required: true,
  },
  lastLogIn: {
    type: Date,
    required: true,
  },
  likes: [
    {
      type: String,
      required: false,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
