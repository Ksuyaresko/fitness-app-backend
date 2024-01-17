// controller для отримання інформації про спожиті продукти із щоденника за обрану дату
const { isMatch } = require("date-fns");

const { ProductDiary } = require("../../models/productDiary");
const { DiaryExercise } = require("../../models");

const allDiaryByDate = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;

  const result = isMatch(date, "dd/MM/yyyy");
  if (result) {
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

    const exercisesResult = await DiaryExercise.findOne({
      ownerId: owner,
      date: date,
    });

    let doneExercises;
    if (!exercisesResult) doneExercises = [];
    else doneExercises = exercisesResult.doneExercises;

    const productsExercisesResult = { productsResult, doneExercises };
    res.status(200).json({ data: productsExercisesResult });
  } else {
    res.json({
      message: `${date} does not match the dd/MM/yyyy format or is not a valid date.`,
    });
  }
};

module.exports = allDiaryByDate;
