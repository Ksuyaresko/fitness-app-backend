const express = require("express");
const { authorization } = require("../../middlewares");

const { Products } = require("../../controller");
const { errorWrap } = require("../../utils");

const router = express.Router();

router.get("/", authorization, errorWrap(Products.getAllProducts));
router.get("/category", authorization, errorWrap(Products.getProductCategory));

module.exports = router;
