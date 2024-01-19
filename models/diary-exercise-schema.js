const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");
const Joi = require("joi");

const diaryEntrySchema = new Schema(
  {
    ownerId: {
      type: ObjectId,
      required: true,
    },
    calories: {
      type: Number,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    exercise_ID: {
      type: Schema.Types.String,
      ref: "exercises",
      required: true,
    },
  },
  { versionKey: false }
);
const DiaryExercise = model("diary-exercise", diaryEntrySchema);

const addExerciseBodySchema = Joi.object({
  exercise_ID: Joi.string().required().messages({
    "any.required": "Missing required exercise_ID field",
  }),
  date: Joi.string().required().messages({
    "any.required": "Missing required date field",
  }),
  time: Joi.number().min(1).required().messages({
    "any.required": "Missing required time field",
  }),
  calories: Joi.number().min(1).required().messages({
    "any.required": "Missing required calories field",
  }),
});

const getExerciseSchema = Joi.object({
  date: Joi.required(),
});

const schemas = {
  addExerciseBodySchema,
  getExerciseSchema,
};

module.exports = { DiaryExercise, schemas };
