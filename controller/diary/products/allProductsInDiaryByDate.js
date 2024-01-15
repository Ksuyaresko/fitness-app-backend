// controller для отримання інформації про спожиті продукти із щоденника за обрану дату

const { ProductDiary } = require("../../../models/productDiary");

const allProductsInDiaryByDate = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.body;
  const result = await ProductDiary.find({ date, owner });
  res.status(200).json(result);
};

module.exports = allProductsInDiaryByDate;
