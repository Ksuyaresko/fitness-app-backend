// controller для збереження продукту, що було спожито користувачем, в щоденнику та його закріплення за обраною датою

const { ProductDiary } = require("../../models");

const addProductInDiaryByDate = async (req, res) => {
  const { _id: owner } = req.user;

  const { _id, product_ID, date, amount, calories } = await ProductDiary.create(
    {
      ...req.body,
      owner,
    }
  );

  // Звертаємося до бази даних для отримання масиву продуктів за користувачем та датою
  const allProductByDate = await ProductDiary.find({
    owner,
    date,
  });

  // Рахуємо загальну кількість калорій спожитих продуктів за датою
  const caloriesConsumed = allProductByDate.reduce(
    (accumulator, currentProduct) => {
      return accumulator + currentProduct.calories;
    },
    0
  );

  // Рахуємо скільки ще калорій користувач може зʼїсти дотримуючись денної норми
  const dailyCalorieIntake = req.user.dailyCalories;
  const caloriesRemaining = dailyCalorieIntake - caloriesConsumed;

  res.status(201).json({
    product: { _id, product_ID, date, amount, calories, owner },
    caloriesConsumedTotal: caloriesConsumed,
    caloriesRemainingTotal: caloriesRemaining,
  });
};

module.exports = addProductInDiaryByDate;
