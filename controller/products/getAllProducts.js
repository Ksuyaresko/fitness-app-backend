const { Product } = require("../../models");

const getAllProducts = async (req, res) => {
  const { page = 1, limit = 10, categories } = req.query;
  const skip = (page - 1) * limit;
  let query = {};

  if (categories) {
    query.category = categories;
  }

  const data = await Product.find(query).skip(skip).limit(limit);
  const totalItems = await Product.countDocuments(query);

  res.json({ data, page, pageSize: limit, totalItems });
};

module.exports = getAllProducts;
