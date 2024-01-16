// controller для отримання інформації про спожиті продукти із щоденника за обрану дату

const moment = require("moment");

const { ProductDiary } = require("../../models/productDiary");
const { DiaryExercise } = require("../../models");

const allProductsInDiaryByDate = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;

  // Функція isValidDateWithMoment для валідації дати
  function isValidDateWithMoment(dateString) {
    return moment(dateString, "DD/MM/YYYY", true).isValid();
  }

  if (isValidDateWithMoment(date)) {
    const ownerObjId = { owner };
    ownerObjId.date = date;

    const productsByDate = await ProductDiary.find(ownerObjId).populate(
      "product_ID",
      "title category groupBloodNotAllowed"
    );

    const productsResult = productsByDate.map(
      ({ _id, product_ID, date, amount, calories }) => ({
        _id,
        product_ID: product_ID._id,
        date,
        amount,
        calories,
        title: product_ID.title,
        category: product_ID.category,
        groupBloodNotAllowed: product_ID.groupBloodNotAllowed,
      })
    );
    res.status(200).json(productsResult);
  } else {
    res.json({ message: `${date} не є коректною датою.` });
  }
};

module.exports = allProductsInDiaryByDate;

//==========================================================
// const { _id: owner } = req.user;
// const { date } = req.query;

// const result = await ProductDiary.find({ date, owner });
// res.status(200).json(result)
//==========================================================
