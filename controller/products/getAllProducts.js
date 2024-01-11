const { Product } = require("../../models");

const getAllProducts = async (req, res) => {
  // const { _id: owner } = req.user;
  const result = await Product.find({});
  res.json(result);
};

module.exports = getAllProducts;
