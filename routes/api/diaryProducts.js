const express = require("express");
const router = express.Router();

const { diaryProducts } = require("../../controller");
const { authorization } = require("../../middlewares");
const { errorWrap } = require("../../utils");

const { addProduct, deleteProduct, getProducts } = diaryProducts;

router.get("/", authorization, errorWrap(getProducts));

router.post("/", authorization, errorWrap(addProduct));

router.delete("/:id", authorization, errorWrap(deleteProduct));

module.exports = router;
