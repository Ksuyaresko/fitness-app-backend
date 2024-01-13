const { DiaryExercise } = require("../../../models");
const { exerciseMock } = require("../../../DB");

const addExercise = async (req, res) => {
  const { _id: exerciseId, burnedCalories: calories, time } = exerciseMock;
  const { _id: owner } = req.user;
  const { time: exerciseDuration, date: receivedDate } = req.body;

  const burnCaloriesPerMinute = Math.round(calories / time);
  const burnCaloriesPerExerciseDuration =
    burnCaloriesPerMinute * exerciseDuration;

  const doneExercise = {
    exerciseId,
    exerciseDuration,
    burnCaloriesPerMinute,
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
module.exports = { addExercise };
