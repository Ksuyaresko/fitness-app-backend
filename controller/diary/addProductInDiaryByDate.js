// controller для збереження продукту, що було спожито користувачем, в щоденнику та його закріплення за обраною датою

const { isMatch } = require("date-fns");

const { ProductDiary } = require("../../models/productDiary");

const addProductInDiaryByDate = async (req, res) => {
  const { date } = req.body;
  const result = isMatch(date, "dd/MM/yyyy");
  const { _id: owner } = req.user;

  if (result) {
    const { _id, product_ID, date, amount, calories } =
      await ProductDiary.create({
        ...req.body,
        owner,
      });

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

    res.status(201).json({
      product: { _id, product_ID, date, amount, calories, owner },
      caloriesConsumedTotal: caloriesConsumed,
    });
  } else {
    res.status(400).json({
      message: `${date} не відповідає формату dd/MM/yyyy чи не є коректною датою.`,
    });
  }
};

module.exports = addProductInDiaryByDate;
