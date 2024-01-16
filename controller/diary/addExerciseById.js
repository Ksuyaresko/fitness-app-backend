const { DiaryExercise } = require("../../models");
const { nanoid } = require("nanoid");
const { Exercise } = require("../../models");
const { HttpError } = require("../../utils");

const addExerciseById = async (req, res) => {
  const { id: exerciseId } = req.params;
  const { _id: owner } = req.user;
  const { time: exerciseDuration, date: receivedDate } = req.body;

  const foundedExercise = await Exercise.findOne({ _id: exerciseId });

  if (!foundedExercise) throw HttpError(404, "No such exercise has been found");

  const {
    burnedCalories: calories,
    time,
    bodyPart,
    equipment,
    name,
    target,
  } = foundedExercise;

  const burnCaloriesPerMinute = Math.round(calories / time);
  const burnCaloriesPerExerciseDuration =
    burnCaloriesPerMinute * exerciseDuration;

  const doneExercise = {
    id: nanoid(),
    time: exerciseDuration,
    burnedCalories: burnCaloriesPerExerciseDuration,
    bodyPart,
    equipment,
    name,
    target,
  };

  const foundedDiary = await DiaryExercise.findOne({
    ownerId: owner,
    date: receivedDate,
  });

  if (!foundedDiary) {
    await DiaryExercise.create({
      ownerId: owner,
      doneExercises: [doneExercise],
      burnedCalories: burnCaloriesPerExerciseDuration,
      sportTime: exerciseDuration,
      date: receivedDate,
    });

    res.status(201).json({ data: { doneExercise: doneExercise } });
  } else {
    await DiaryExercise.findByIdAndUpdate(
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

    res.status(201).json({ data: { doneExercise: doneExercise } });
  }
};
module.exports = addExerciseById;
