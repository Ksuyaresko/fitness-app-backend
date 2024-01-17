const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const filterExercises = new Schema(
  {
    filter: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Filters = mongoose.model("filters", filterExercises);

module.exports = { Filters };
