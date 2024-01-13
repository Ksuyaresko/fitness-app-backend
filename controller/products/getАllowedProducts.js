const { Product } = require("../../models");

const getАllowedProducts = async (req, res) => {
  const { choice } = req.query;
  // const { setting:{blood} } = req.user;
  // const blood = "1";
  // const resultfn = `groupBloodNotAllowed.${blood}`;
  // console.log(resultfn)
  const result = await Product.find({ 'groupBloodNotAllowed.1': choice } );

  res.status(200).json(result);
};

module.exports = getАllowedProducts;
