const { DiaryExercise } = require("../../../models");
const { HttpError } = require("../../../utils");

const deleteExerciseById = async (req, res) => {
  const { _id: owner } = req.user;
  const { date: receivedDate } = req.body;
  const { id } = req.params;

  const foundedDiary = await DiaryExercise.findOne({
    ownerId: owner,
    date: receivedDate,
  });

  const foundedDiaryEntry = foundedDiary.doneExercises.find(
    (exercise) => exercise.id === id
  );

  if (!foundedDiaryEntry)
    throw HttpError(404, "No such diary entry has been found");

  const time = foundedDiaryEntry.time;
  const calories = foundedDiaryEntry.burnedCalories;

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
