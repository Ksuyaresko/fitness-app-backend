const { Filters } = require("../../models");
const { HttpError } = require("../../utils");

const getAllExercises = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  let { query } = req.params;

  if (!query || typeof query !== "string") {
    throw HttpError(400, "Invalid query parameter");
  }

  const skip = (page - 1) * limit;

  //? Функція для зміни регістру першої букви
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  query = capitalizeFirstLetter(query);

  const data = await Filters.find({ filter: `${query}` })
    .skip(skip)
    .limit(limit);

  const totalItems = await Filters.countDocuments({ filter: query });
  res.json({ data, totalItems });
};

module.exports = getAllExercises;
