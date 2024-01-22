const { DiaryExercise } = require("../../models");
const { HttpError } = require("../../utils");

const deleteExerciseById = async (req, res) => {
  const { id } = req.params;

  const foundedDiaryEntry = await DiaryExercise.findById(id);

  const { deletedCount } = await DiaryExercise.deleteOne({ _id: id });

  if (!deletedCount) throw HttpError(404, "No such diary entry has been found");

  const foundedDiaryEntryes = await DiaryExercise.find({
    date: foundedDiaryEntry.date,
  });

  let caloriesBurnedTotal = 0;
  if (foundedDiaryEntryes) {
    caloriesBurnedTotal = foundedDiaryEntryes.reduce(
      (accumulator, currentExercise) => {
        return accumulator + currentExercise.calories;
      },
      0
    );
  }

  let timeTotal = 0;
  if (foundedDiaryEntryes) {
    timeTotal = foundedDiaryEntryes.reduce((accumulator, currentExercise) => {
      return accumulator + currentExercise.time;
    }, 0);
  }

  res.json({
    data: {
      message: "Diary entry successfully deleted",
      timeTotal,
      caloriesBurnedTotal,
    },
  });
};
module.exports = deleteExerciseById;
