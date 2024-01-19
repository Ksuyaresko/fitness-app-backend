// controller для отримання інформації про спожиті продукти із щоденника за обрану дату
const { isMatch } = require("date-fns");

const { ProductDiary } = require("../../models/productDiary");
const { DiaryExercise } = require("../../models");
const { HttpError } = require("../../utils");

const allDiaryByDate = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;

  const result = isMatch(date, "dd/MM/yyyy");
  if (!result)
    return res.status(400).json({
      message: `${date} does not match the dd/MM/yyyy format or is not a valid date.`,
    });

  const ownerObjId = { owner };
  ownerObjId.date = date;

  // products **********************************************************
  const productsByDate = await ProductDiary.find(ownerObjId).populate(
    "product_ID",
    "title category groupBloodNotAllowed"
  );

  let productsResult;
  if (!productsByDate || productsByDate.length === 0) productsResult = null;
  else {
    let bloodUser;
    try {
      bloodUser = req.user.settings.blood.toString();
    } catch {
      throw HttpError(404, "User blood type is not specified");
    }

    const products = productsByDate.map(
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

    const newProducts = products.map((product) => {
      const recommend = product.groupBloodNotAllowed.get(bloodUser);
      product.recommend = recommend;
      return product;
    });

    const caloriesConsumed = products.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.calories;
    }, 0);

    productsResult = {
      products: newProducts,
      caloriesConsumedTotal: caloriesConsumed,
    };
  }

  // exercises *******************************************************
  const exercises = await DiaryExercise.findOne({
    ownerId: owner,
    date: date,
  });

  let exercisesResult;
  if (!exercises) exercisesResult = null;
  else {
    const { doneExercises, timeTotal, caloriesTotal } = exercises;

    exercisesResult = {
      exercises: doneExercises,
      timeTotal,
      caloriesBurnedTotal: caloriesTotal,
    };
  }

  res.json({
    data: {
      productsResult,
      exercisesResult,
    },
  });
};

module.exports = allDiaryByDate;
