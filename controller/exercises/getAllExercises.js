const { Exercise } = require("../../models");

const getAllExercises = async (req, res) => {
  const result = await Exercise.find({});
  res.status(200).json(result);
};

module.exports = getAllExercises;
