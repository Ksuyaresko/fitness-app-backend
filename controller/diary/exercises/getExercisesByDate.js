const { DiaryExercise } = require("../../../models");

const getExercisesByDate = async (req, res) => {
  const { _id: owner } = req.user;
  const { date: receivedDate } = req.body;

  const result = await DiaryExercise.findOne({
    ownerId: owner,
    date: receivedDate,
  });

  res.status(200).json(result);
};
module.exports = { getExercisesByDate };
