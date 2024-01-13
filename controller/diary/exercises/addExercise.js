const { Diary } = require("../../../models");
const { exerciseMock } = require("../../../DB");
const { getCurrentFormatedDate } = require("../../../helpers");
// const { isValidId } = require("../../../middlewares");

const addExercise = async (req, res) => {
  const { _id: exerciseId, burnedCalories: calories, time } = exerciseMock;
  const { _id: owner } = req.user;
  const { time: exerciseDuration } = req.body;

  const burnCaloriesPerMinute = Math.round(calories / time);
  const burnCaloriesPerExerciseDuration =
    burnCaloriesPerMinute * exerciseDuration;

  const doneExercise = {
    exerciseId,
    exerciseDuration,
    burnCaloriesPerMinute,
  };

  const foundedDiary = await Diary.findOne({ ownerId: owner });

  if (!foundedDiary || foundedDiary.date !== getCurrentFormatedDate()) {
    const data = await Diary.create({
      ownerId: owner,
      doneExercises: [doneExercise],
      burnedCalories: burnCaloriesPerExerciseDuration,
      sportTime: exerciseDuration,
      date: getCurrentFormatedDate(),
    });
    res.status(201).json(data);
  } else {
    const data = await Diary.findByIdAndUpdate(
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
module.exports = { addExercise };
