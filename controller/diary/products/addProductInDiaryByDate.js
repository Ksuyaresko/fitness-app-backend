const { format } = require("date-fns");

const { ProductDiary } = require("../../../models/productDiary");

const addProductInDiaryByDate = async (req, res) => {
  const { _id: owner } = req.user;

  req.body.date = format(new Date(req.body.date), "dd/MM/yyyy");

  const { product_ID, date, amount, calories, _id } = await ProductDiary.create(
    {
      ...req.body,
      owner,
    }
  );

  res.status(201).json({ product_ID, date, amount, calories, _id });
};

module.exports = addProductInDiaryByDate;
