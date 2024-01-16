const { Product } = require("../../models");

const getАllowedProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const productType = req.params.type;
  const bloodType = req.user.settings.blood;

  const skip = (page - 1) * limit;

  let query = {};

  if (productType === "recommended") {
    query = { [`groupBloodNotAllowed.${bloodType}`]: true };
  } else if (productType === "notrecommended") {
    query = { [`groupBloodNotAllowed.${bloodType}`]: false };
  }
  const data = await Product.find(query).skip(skip).limit(limit);
  const totalProducts = await Product.countDocuments(query);

  res.json({
    data,
    totalProducts,
  });
};

module.exports = getАllowedProducts;
