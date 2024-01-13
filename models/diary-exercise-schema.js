const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const diaryEntrySchema = new Schema(
  {
    ownerId: {
      type: ObjectId,
      required: true,
    },
    doneExercises: {
      type: Array,
    },
    burnedCalories: {
      type: Number,
    },
    sportTime: {
      type: Number,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Diary = model("diary-exercise", diaryEntrySchema);

module.exports = { Diary };
