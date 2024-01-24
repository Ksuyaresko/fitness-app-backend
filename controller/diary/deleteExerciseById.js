const { DiaryExercise } = require("../../models");
const { HttpError } = require("../../utils");
const { exercisesCalculations } = require("../../helpers");

const deleteExerciseById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const foundedDiaryEntry = await DiaryExercise.findById(id);

  const { deletedCount } = await DiaryExercise.deleteOne({ _id: id });

  if (!deletedCount) throw HttpError(404, "No such diary entry has been found");

  const foundedDiaryEntryes = await DiaryExercise.find({
    ownerId: owner,
    date: foundedDiaryEntry.date,
  });

  const { dailyActivity, dailyCalories } = req.user;

  let timeRemains = dailyActivity;
  let caloriesRemains = dailyCalories;

  if (foundedDiaryEntryes) {
    timeRemains = exercisesCalculations(
      foundedDiaryEntryes,
      dailyActivity,
      dailyCalories
    ).timeRemains;
    caloriesRemains = exercisesCalculations(
      foundedDiaryEntryes,
      dailyActivity,
      dailyCalories
    ).caloriesRemains;
  }

  res.json({
    data: {
      message: "Diary entry successfully deleted",
      timeRemains,
      caloriesRemains,
    },
  });
};
module.exports = deleteExerciseById;
