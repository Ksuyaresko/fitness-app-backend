const { DiaryExercise } = require("../../../models");
const { HttpError } = require("../../../utils");

const deleteExerciseById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const foundedDiary = await DiaryExercise.findOne({
    ownerId: owner,
    "doneExercises.id": id,
  });

  const foundedDiaryEntry = foundedDiary.doneExercises.find(
    (exercise) => exercise.id === id
  );

  if (!foundedDiaryEntry)
    throw HttpError(404, "No such diary entry has been found");

  const time = foundedDiaryEntry.time;
  const calories = foundedDiaryEntry.burnedCalories;

  await DiaryExercise.findByIdAndUpdate(
    foundedDiary._id,
    {
      $inc: { burnedCalories: -calories, sportTime: -time },
      $pull: { doneExercises: { id } },
    },
    { new: true }
  );

  res.json({ data: { message: "Diary entry successfully deleted" } });
};
module.exports = { deleteExerciseById };
