const { ExerciseBodyParts } = require("../../models");
const { HttpError } = require("../../utils");

const getExercisesBodyPart = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  let { query } = req.params;

  if (!query || typeof query !== "string") {
    throw HttpError(400, "Invalid query parameter");
  }

  const skip = (page - 1) * limit;

  const data = await ExerciseBodyParts.find({ bodyPart: `${query}` })
    .skip(skip)
    .limit(limit);

  const totalItems = await ExerciseBodyParts.countDocuments({
    bodyPart: query,
  });
  res.json({ data, totalItems });
};

module.exports = getExercisesBodyPart;
