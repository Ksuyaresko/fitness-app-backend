const { ExerciseQuery } = require("../../models");
const { HttpError } = require("../../utils");
const { validQueryParams } = require("../../helpers");

const getExercisesQuery = async (req, res) => {
  const { query } = req.params;

  const validPage = parseInt(req.query.page) || 1;
  const validLimit = parseInt(req.query.limit) || 10;

  if (!query || query.trim() === "") {
    throw HttpError(400, "Query cannot be empty");
  }
  if (!validQueryParams.includes(query)) {
    throw HttpError(400, "Invalid query parameter");
  }

  if (isNaN(validPage) || isNaN(validLimit)) {
    throw HttpError(400, "Page and limit must be numeric values");
  }

  if (validPage < 1 || validLimit < 1) {
    throw HttpError(400, "Page and limit must be greater than or equal to 1");
  }

  const skip = (validPage - 1) * validLimit;

  const dynamicQuery = {
    $or: [{ bodyPart: query }, { equipment: query }, { target: query }],
  };

  const data = await ExerciseQuery.find(dynamicQuery)
    .skip(skip)
    .limit(validLimit);

  const totalItems = await ExerciseQuery.countDocuments(dynamicQuery);

  res.json({ data, totalItems });
};

module.exports = getExercisesQuery;
