const { DiaryExercise } = require("../../models");
const { HttpError } = require("../../utils");

const deleteExerciseById = async (req, res) => {
  const { id } = req.params;

  const { deletedCount } = await DiaryExercise.deleteOne({ _id: id });

  if (!deletedCount) throw HttpError(404, "No such diary entry has been found");

  res.json({ data: { message: "Diary entry successfully deleted" } });
};
module.exports = deleteExerciseById;
