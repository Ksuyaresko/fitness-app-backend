const express = require("express");
const { authorization } = require("../../middlewares");

const { Products } = require("../../controller");
const { errorWrap } = require("../../utils");

const router = express.Router();

router.get("/", authorization, errorWrap(Products.getAllProducts));
router.get("/:userId", authorization, errorWrap(Products.getАllowedProducts));

module.exports = router;
