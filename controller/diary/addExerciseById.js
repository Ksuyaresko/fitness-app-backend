const { DiaryExercise } = require("../../models");
const { HttpError } = require("../../utils");
const { isMatch } = require("date-fns");
const { isValidObjectId } = require("mongoose");

const addExerciseById = async (req, res) => {
  const { _id: owner } = req.user;
  const { date, exercise_ID, calories, time } = req.body;

  if (!isValidObjectId(exercise_ID))
    throw HttpError(400, `invalid id: ${exercise_ID}`);

  if (!isMatch(date, "dd/MM/yyyy"))
    throw HttpError(400, "Incorrect date format");

  const doneExercise = await DiaryExercise.create({
    ownerId: owner,
    exercise_ID,
    calories,
    time,
    date,
  });

  const foundedDiaryEntryes = await DiaryExercise.find({
    ownerId: owner,
    date,
  });

  const caloriesBurnedTotal = foundedDiaryEntryes.reduce(
    (accumulator, currentExercise) => {
      return accumulator + currentExercise.calories;
    },
    0
  );

  const timeTotal = foundedDiaryEntryes.reduce(
    (accumulator, currentExercise) => {
      return accumulator + currentExercise.time;
    },
    0
  );

  res.status(201).json({
    data: {
      doneExercise,
      timeTotal,
      caloriesBurnedTotal,
    },
  });
};
module.exports = addExerciseById;
