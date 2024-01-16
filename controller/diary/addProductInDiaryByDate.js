// controller для збереження продукту, що було спожито користувачем, в щоденнику та його закріплення за обраною датою

const { ProductDiary } = require("../../models/productDiary");

const addProductInDiaryByDate = async (req, res) => {
  const { _id: owner } = req.user;

  const { _id, product_ID, date, amount, calories } = await ProductDiary.create(
    {
      ...req.body,
      owner,
    }
  );

  res.status(201).json({ _id, product_ID, date, amount, calories, owner });
};

module.exports = addProductInDiaryByDate;

//=============================================================================
// const addProductInDiaryByDate = async (req, res) => {
//   const { _id: owner } = req.user;

//   const { product_ID, date, amount, calories } = await ProductDiary.create({
//     ...req.body,
//     owner,
//   });

//   res.status(201).json({ product_ID, date, amount, calories, owner });
// };
//===============================================================================
