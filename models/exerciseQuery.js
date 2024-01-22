const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseQuery = new Schema(
  {
    bodyPart: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
    gifUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    burnedCalories: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const ExerciseQuery = mongoose.model("exercises", exerciseQuery);

module.exports = { ExerciseQuery };
