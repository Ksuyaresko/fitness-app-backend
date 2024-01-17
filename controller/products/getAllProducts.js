const { Product } = require("../../models");

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10, categories, search, type } = req.query;

  const bloodType = req.user.settings.blood;
  const skip = (page - 1) * limit;
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
