const express = require("express");
const router = express.Router();

const { diaryProducts } = require("../../controller");
const { authorization, validateBody, isValidId } = require("../../middlewares");
const { errorWrap } = require("../../utils");
const { bodyDiaryProductSchema } = require("../../models/productDiary");

const {
  addProductInDiaryByDate,
  delProductInDiaryByDate,
  allProductsInDiaryByDate,
} = diaryProducts;

// Router для отримання всіх продуктів зі щоденника за обраною датою
router.get("/day", authorization, errorWrap(allProductsInDiaryByDate));

// Router для збереження продукту, що було спожито користувачем, в щоденнику та його закріплення за обраною датою
router.post(
  "/day/products",
  authorization,
  validateBody(bodyDiaryProductSchema),
  errorWrap(addProductInDiaryByDate)
);

// Router для видалення продукту, що було спожито користувачем, із щоденника в обрану дату
router.delete(
  "/day/products/:id",
  authorization,
  isValidId,
  errorWrap(delProductInDiaryByDate)
);

module.exports = router;
