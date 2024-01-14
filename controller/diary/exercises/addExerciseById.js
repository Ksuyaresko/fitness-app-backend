const { DiaryExercise } = require("../../../models");
const { nanoid } = require("nanoid");
const { Exercise } = require("../../../models");

const addExerciseById = async (req, res) => {
  const { id: exerciseId } = req.params;
  const { _id: owner } = req.user;
  const { time: exerciseDuration, date: receivedDate } = req.body;

  const foundedExercise = await Exercise.findOne({ _id: exerciseId });

  const { burnedCalories: calories, time } = foundedExercise;

  const burnCaloriesPerMinute = Math.round(calories / time);
  const burnCaloriesPerExerciseDuration =
    burnCaloriesPerMinute * exerciseDuration;

  const doneExercise = {
    id: nanoid(),
    exerciseId: { $oid: exerciseId },
    exerciseDuration,
    burnCalories: burnCaloriesPerExerciseDuration,
  };

  const foundedDiary = await DiaryExercise.findOne({
    ownerId: owner,
    date: receivedDate,
  });

  if (!foundedDiary) {
    const data = await DiaryExercise.create({
      ownerId: owner,
      doneExercises: [doneExercise],
      burnedCalories: burnCaloriesPerExerciseDuration,
      sportTime: exerciseDuration,
      date: receivedDate,
    });

    res.status(201).json(data);
  } else {
    const data = await DiaryExercise.findByIdAndUpdate(
      foundedDiary._id,
      {
        $inc: {
          burnedCalories: +burnCaloriesPerExerciseDuration,
          sportTime: +exerciseDuration,
        },
        $push: {
          doneExercises: doneExercise,
        },
      },
      { new: true }
    );

    res.status(201).json(data);
  }
};
module.exports = { addExerciseById };
