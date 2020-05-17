const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;
