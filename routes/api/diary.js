const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middlewares");
const { schemasExercise } = require("../../models");

const { diaryExercises } = require("../../controller");
const { authorization } = require("../../middlewares");
const { errorWrap } = require("../../utils");

const { addExerciseById, deleteExerciseById, getExercisesByDate } =
  diaryExercises;
const { addExerciseBodySchema, getExercisesBodySchema } = schemasExercise;

router.get(
  "/",
  authorization,
  validateBody(getExercisesBodySchema),
  errorWrap(getExercisesByDate)
);

router.post(
  "/",
  authorization,
  validateBody(addExerciseBodySchema),
  errorWrap(addExerciseById)
);

router.delete("/:id", authorization, errorWrap(deleteExerciseById));

module.exports = router;
