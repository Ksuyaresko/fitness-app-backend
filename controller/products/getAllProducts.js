const { Product } = require("../../models");

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10, categories, search } = req.query;
  const skip = (page - 1) * limit;
  let query = {};

  if (categories) {
    query.category = categories;
  }

  let data, totalItems;

  if (!search) {
    data = await Product.find(query).skip(skip).limit(limit);
    totalItems = await Product.countDocuments(query);
    res.json({ data, totalItems });
  } else {
    query.title = { $regex: search, $options: "i" };
    data = await Product.find(query).skip(skip).limit(limit);
    totalItems = await Product.countDocuments(query);

    res.json({ data, totalItems });
  }
};
module.exports = getAllProducts;
