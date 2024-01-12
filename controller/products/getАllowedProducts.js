const { Product } = require("../../models");

const getАllowedProducts = async (req, res) => {
    const { settings: blood } = req.user;
    console.log(req.params)
     const { choice } = req.params;
  const result = await Product.find({blood:choice});
  res.json(result);
};

module.exports = getАllowedProducts;
