const { Product } = require("../../models");

const getAllProducts = async (req, res) => {
  const result = await Product.find({});
  res.json(result);
};

module.exports = getAllProducts;
