// controller для отримання інформації про спожиті продукти із щоденника за обрану дату
const { isMatch } = require("date-fns");

const { ProductDiary } = require("../../models/productDiary");
const { DiaryExercise } = require("../../models");
const { HttpError } = require("../../utils");

const allDiaryByDate = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;

  let bloodUser;
  try {
    bloodUser = req.user.settings.blood.toString();
  } catch {
    throw HttpError(404, "User blood type is not specified");
  }

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

    const newProductsResult = productsResult.map((product) => {
      const recommend = product.groupBloodNotAllowed.get(bloodUser);
      product.recommend = recommend;
      return product;
    });

    const caloriesConsumed = productsResult.reduce(
      (accumulator, currentProduct) => {
        return accumulator + currentProduct.calories;
      },
      0
    );

    const exercisesByDayAndOwner = await DiaryExercise.findOne({
      ownerId: owner,
      date: date,
    });

    let exercisesResult = [];
    let caloriesBurned = 0;
    let sportTime = 0;
    if (exercisesByDayAndOwner) {
      exercisesResult = exercisesByDayAndOwner.doneExercises;
      caloriesBurned = exercisesByDayAndOwner.caloriesTotal;
      sportTime = exercisesByDayAndOwner.timeTotal;
    }

    const productsExercisesResult = {
      productsResult: newProductsResult,
      caloriesConsumed,
      exercisesResult,
      sportTime,
      caloriesBurned,
    };
    res.status(200).json({ data: productsExercisesResult });
  } else {
    res.status(400).json({
      message: `${date} does not match the dd/MM/yyyy format or is not a valid date.`,
    });
  }
};

module.exports = allDiaryByDate;
