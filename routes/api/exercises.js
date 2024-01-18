const express = require("express");
const { authorization } = require("../../middlewares");

const { Exercises } = require("../../controller");
const { errorWrap } = require("../../utils");

const router = express.Router();

router.get("/:query", authorization, errorWrap(Exercises.getAllExercises));
router.get(
  "/bodyPart/:query",
  authorization,
  errorWrap(Exercises.getExercisesBodyPart)
);

module.exports = router;
