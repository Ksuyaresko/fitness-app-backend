// controller для видалення продукту, що було спожито користувачем, із щоденника в обрану дату

const { ProductDiary } = require("../../../models/productDiary");
const { HttpError } = require("../../../utils");

const delProductInDiaryByDate = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await ProductDiary.deleteMany({
    _id: id,
    owner,
  });

  if (!result || !result.deletedCount) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "The product has been removed from the diary" });
};

module.exports = delProductInDiaryByDate;

//=======================================================
// const delProductInDiaryByDate = async (req, res) => {
//   const { id } = req.params;
//   const { date } = req.body;
//   const { _id: owner } = req.user;

//   const result = await ProductDiary.deleteMany({
//     date,
//     product_ID: id,
//     owner,
//   });

//   if (!result || !result.deletedCount) {
//     throw HttpError(404, "Not found");
//   }
//========================================================
