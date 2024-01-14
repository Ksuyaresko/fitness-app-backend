const { DiaryExercise } = require("../../../models");

const deleteExerciseById = async (req, res) => {
  const { _id: owner } = req.user;
  const { date: receivedDate } = req.body;
  const { id } = req.params;

  const foundedDiary = await DiaryExercise.findOne({
    ownerId: owner,
    date: receivedDate,
  });

  const foundedExercise = foundedDiary.doneExercises.find(
    (exercise) => exercise.id === id
  );

  const time = foundedExercise.exerciseDuration;
  const calories = foundedExercise.burnCaloriesPerMinute * time;

  const data = await DiaryExercise.findByIdAndUpdate(
    foundedDiary._id,
    {
      $inc: { burnedCalories: -calories, sportTime: -time },
      $pull: { doneExercises: { id } },
    },
    { new: true }
  );

  res.status(200).json(data);
};
module.exports = { deleteExerciseById };
