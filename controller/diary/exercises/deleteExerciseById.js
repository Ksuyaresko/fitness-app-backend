const { DiaryExercise } = require("../../../models");
const { HttpError } = require("../../../utils");

const deleteExerciseById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id: diaryEntryId } = req.params;

  const foundedDiary = await DiaryExercise.findOne({
    ownerId: owner,
    "doneExercises.diaryEntryId": diaryEntryId,
  });

  const foundedDiaryEntry = foundedDiary.doneExercises.find(
    (exercise) => exercise.diaryEntryId === diaryEntryId
  );

  if (!foundedDiaryEntry)
    throw HttpError(404, "No such diary entry has been found");

  const time = foundedDiaryEntry.time;
  const calories = foundedDiaryEntry.burnedCalories;

  await DiaryExercise.findByIdAndUpdate(
    foundedDiary._id,
    {
      $inc: { burnedCalories: -calories, sportTime: -time },
      $pull: { doneExercises: { diaryEntryId } },
    },
    { new: true }
  );

  res
    .status(200)
    .json({ data: { message: "Diary entry successfully deleted" } });
};
module.exports = { deleteExerciseById };
