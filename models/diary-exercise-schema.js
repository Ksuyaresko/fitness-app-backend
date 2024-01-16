const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");
const Joi = require("joi");

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
const DiaryExercise = model("diary-exercise", diaryEntrySchema);

const addExerciseBodySchema = Joi.object({
  date: Joi.required(),
  time: Joi.required(),
});

const getExerciseSchema = Joi.object({
  date: Joi.required(),
});

const schemas = {
  addExerciseBodySchema,
  getExerciseSchema,
};

module.exports = { DiaryExercise, schemas };
