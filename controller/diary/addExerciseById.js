const { DiaryExercise } = require("../../models");
const { HttpError } = require("../../utils");
const { isMatch } = require("date-fns");

const addExerciseById = async (req, res) => {
  const { _id: owner } = req.user;
  const { date, exercise_ID, calories, time } = req.body;

  const result = isMatch(date, "dd/MM/yyyy");
  if (!result) throw HttpError(400, "Incorrect date format");

  const doneExercise = await DiaryExercise.create({
    ownerId: owner,
    exercise_ID,
    calories,
    time,
    date,
  });

  res.status(201).json({ data: { doneExercise } });
};
module.exports = addExerciseById;
