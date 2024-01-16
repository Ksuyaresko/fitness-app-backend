const express = require("express");
const router = express.Router();

const { diaryController } = require("../../controller");
const { authorization, validateBody, isValidId } = require("../../middlewares");
const { errorWrap } = require("../../utils");
const { bodyDiaryProductSchema } = require("../../models/productDiary");

const {
  addProductInDiaryByDate,
  delProductInDiaryByDate,
  allProductsInDiaryByDate,
} = diaryController;

// Router для отримання інформації про спожиті продукти із щоденника за обрану дату
router.get("/day", authorization, errorWrap(allProductsInDiaryByDate));

// Router для збереження продукту, що було спожито користувачем, в щоденнику та його закріплення за обраною датою
router.post(
  "/products",
  authorization,
  validateBody(bodyDiaryProductSchema),
  errorWrap(addProductInDiaryByDate)
);

// Router для видалення продукту, що було спожито користувачем, із щоденника в обрану дату
router.delete(
  "/products/:id",
  authorization,
  isValidId,
  errorWrap(delProductInDiaryByDate)
);

module.exports = router;
