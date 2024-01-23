const { DiaryExercise } = require("../../models");
const { User } = require("../../models");
const { HttpError } = require("../../utils");
const { exercisesCalculations } = require("../../helpers");

const deleteExerciseById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const foundedDiaryEntry = await DiaryExercise.findById(id);

  const { deletedCount } = await DiaryExercise.deleteOne({ _id: id });

  if (!deletedCount) throw HttpError(404, "No such diary entry has been found");

  const foundedDiaryEntryes = await DiaryExercise.find({
    date: foundedDiaryEntry.date,
  });

  const { dailyActivity, dailyCalories } = await User.findOne({ _id: owner });

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

  if (foundedDiaryEntryes) {
    timeTotal = foundedDiaryEntryes.reduce((accumulator, currentExercise) => {
      return accumulator + currentExercise.time;
    }, 0);
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
