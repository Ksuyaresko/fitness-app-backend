// controller для збереження продукту, що було спожито користувачем, в щоденнику та його закріплення за обраною датою

const { isMatch } = require("date-fns");

const { ProductDiary } = require("../../models/productDiary");

const addProductInDiaryByDate = async (req, res) => {
  const { date } = req.body;
  const result = isMatch(date, "dd/MM/yyyy");

  if (result) {
    const { _id: owner } = req.user;

    const { _id, product_ID, date, amount, calories } =
      await ProductDiary.create({
        ...req.body,
        owner,
      });

    res.status(201).json({ _id, product_ID, date, amount, calories, owner });
  } else {
    res.status(400).json({
      message: `${date} не відповідає формату dd/MM/yyyy чи не є коректною датою.`,
    });
  }
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
