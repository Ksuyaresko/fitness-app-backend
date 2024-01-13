const authRouter = require("./auth");
const diaryRouter = require("./diary");

const productsRouter = require('./product')
const exercisesRouter = require('./exercises')
const diaryProductsRouter = require("./diaryProducts");


module.exports = { authRouter, diaryRouter, diaryProductsRouter, productsRouter, exercisesRouter };

