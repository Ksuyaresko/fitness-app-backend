const { Product } = require("../../models");

const getАllowedProducts = async (req, res) => {
  const { choice } = req.query;
  const bloodType = req.user.settings.blood;

  const result = await Product.find({
    [`groupBloodNotAllowed.${bloodType}`]: choice,
  });

  res.json(result);
};

module.exports = getАllowedProducts;
