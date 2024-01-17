const { DiaryExercise } = require("../../models");
const { nanoid } = require("nanoid");
const { HttpError } = require("../../utils");
const { isMatch } = require("date-fns");

const addExerciseById = async (req, res) => {
  const { _id: owner } = req.user;
  const { date, exercise_ID, calories, time } = req.body;

  const result = isMatch(date, "dd/MM/yyyy");
  if (!result) throw HttpError(400, "Incorrect date format");

  const doneExercise = {
    id: nanoid(),
    exercise_ID,
    calories,
    time,
  };

  const foundedDiary = await DiaryExercise.findOne({
    ownerId: owner,
    date,
  });

  if (!foundedDiary) {
    await DiaryExercise.create({
      ownerId: owner,
      doneExercises: [doneExercise],
      caloriesTotal: calories,
      date,
    });

    res.status(201).json({ data: { doneExercise: doneExercise } });
  } else {
    await DiaryExercise.findByIdAndUpdate(
      foundedDiary._id,
      {
        $inc: {
          caloriesTotal: +calories,
        },
        $push: {
          doneExercises: doneExercise,
        },
      },
      { new: true }
    );

    res.status(201).json({ data: { doneExercise: doneExercise } });
  }
};
module.exports = addExerciseById;
