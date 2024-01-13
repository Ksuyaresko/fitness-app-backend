const { Exercise } = require("../../models");

const getAllExercises = async (req, res) => {
  const result = await Exercise.find({});
  res.json(result);
};

module.exports = getAllExercises;
