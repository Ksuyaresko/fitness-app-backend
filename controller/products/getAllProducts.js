const { Product } = require("../../models");
const { HttpError } = require("../../utils");

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10, categories, search, type } = req.query;
  const bloodType = req.user.settings.blood;
  const skip = (page - 1) * limit;

  const validPage = parseInt(req.query.page) || 1;
  const validLimit = parseInt(req.query.limit) || 10;

   if (isNaN(validPage) || isNaN(validLimit)) {
     throw HttpError(400, "Page and limit must be numeric values");
   }

  if (validPage < 1 || validLimit < 1) {
    throw HttpError(400, `Invalid page or limit value`);
  }

  const validBloodTypes = [1, 2, 3, 4];
  if (!validBloodTypes.includes(bloodType)) {
    throw HttpError(400, `invalid blood type`);
  }

  const lowercaseType = type ? type.toLowerCase() : null;
  if (
    lowercaseType &&
    !["recommended", "notrecommended"].includes(lowercaseType)
  ) {
    throw HttpError(400, `Invalid type value`);
  }

  if (categories) {
    if (typeof categories !== "string") {
      throw HttpError(400, `Categories must be a string`);
    }
  }
  let query = {};

  if (categories) {
    query.category = categories;
  }

  let data, totalItems;

  if (type) {
    if (type === "recommended") {
      query[`groupBloodNotAllowed.${bloodType}`] = true;
    } else if (type === "notrecommended") {
      query[`groupBloodNotAllowed.${bloodType}`] = false;
    }
  }

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  data = await Product.find(query).skip(skip).limit(limit);
  totalItems = await Product.countDocuments(query);

  res.json({ data, totalItems });
};

module.exports = getAllProducts;
