const express = require("express");
const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");
const { schemasExercise } = require("../../models");

const { diaryExercises } = require("../../controller");
const { authorization } = require("../../middlewares");
const { errorWrap } = require("../../utils");

const { addExerciseById, deleteExerciseById, getExercisesByDate } =
  diaryExercises;
const { addExerciseBodySchema, getDelExerciseSchema } = schemasExercise;

router.get(
  "/",
  authorization,
  validateBody(getDelExerciseSchema),
  errorWrap(getExercisesByDate)
);

router.post(
  "/:id",
  authorization,
  isValidId,
  validateBody(addExerciseBodySchema),
  errorWrap(addExerciseById)
);

router.delete(
  "/:id",
  authorization,
  validateBody(getDelExerciseSchema),
  errorWrap(deleteExerciseById)
);

module.exports = router;
