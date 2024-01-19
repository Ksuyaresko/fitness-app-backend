// controller для видалення продукту, що було спожито користувачем, із щоденника в обрану дату

const { ProductDiary } = require("../../models/productDiary");
const { HttpError } = require("../../utils");

const delProductInDiaryByDate = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  // Отримуємо з бази даних продукт, який буде видалятися
  const deletedProduct = await ProductDiary.findById(id);
  const dateAddDelProduct = deletedProduct?.date;

  // Видаляємо продукт з бази даних
  const result = await ProductDiary.deleteMany({
    _id: id,
    owner,
  });

  if (!result || !result.deletedCount) {
    throw HttpError(404, "Not found");
  }

  // Звертаємося до бази даних для отримання масиву продуктів за користувачем та датою
  const allProductByDate = await ProductDiary.find({
    owner,
    date: dateAddDelProduct,
  }); //

  // Рахуємо загальну кількість калорій спожитих продуктів за датою
  const caloriesConsumed = allProductByDate.reduce(
    (accumulator, currentProduct) => {
      return accumulator + currentProduct.calories;
    },
    0
  ); //

  res.json({
    message: "The product has been removed from the diary",
    caloriesConsumed,
  });
};

module.exports = delProductInDiaryByDate;
