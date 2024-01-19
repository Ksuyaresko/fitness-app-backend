const { DiaryExercise } = require("../../models");
const { HttpError } = require("../../utils");

const deleteExerciseById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const foundedDiary = await DiaryExercise.findOne({
    ownerId: owner,
    "doneExercises.id": id,
  });

  if (!foundedDiary) throw HttpError(404, "No such diary entry has been found");

  const foundedDiaryEntry = foundedDiary.doneExercises.find(
    (exercise) => exercise.id === id
  );

  const { time, calories } = foundedDiaryEntry;

  if (foundedDiary.doneExercises.length === 1) {
    await DiaryExercise.deleteOne({ _id: foundedDiary._id });
  } else {
    await DiaryExercise.findByIdAndUpdate(
      foundedDiary._id,
      {
        $inc: { caloriesTotal: -calories, timeTotal: -time },
        $pull: { doneExercises: { id } },
      },
      { new: true }
    );
  }

  res.json({ data: { message: "Diary entry successfully deleted" } });
};
module.exports = deleteExerciseById;
