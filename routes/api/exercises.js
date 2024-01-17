const express = require("express");
const { authorization } = require("../../middlewares");

const { Exercises } = require("../../controller");
const { errorWrap } = require("../../utils");

const router = express.Router();

router.get("/:query", authorization, errorWrap(Exercises.getAllExercises));

module.exports = router;
