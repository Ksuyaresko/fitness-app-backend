const { Product } = require("../../models");

const getProductCategory = async (req, res) => {
  const data = await Product.distinct("category");
  res.json(data);
};

module.exports = getProductCategory;
