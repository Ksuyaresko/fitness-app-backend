// controller для видалення продукту, що було спожито користувачем, із щоденника в обрану дату

const { ProductDiary } = require("../../../models/productDiary");
const { HttpError } = require("../../../utils");

const delProductInDiaryByDate = async (req, res) => {
  const { id } = req.params;

  const result = await ProductDiary.findOneAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "The product has been removed from the diary" });
};

module.exports = delProductInDiaryByDate;
