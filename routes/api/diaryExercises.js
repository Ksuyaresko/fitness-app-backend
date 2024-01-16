const express = require("express");
const router = express.Router();

const { validateBody, isValidId } = require("../../middlewares");
const { schemasExercise } = require("../../models");

const { diaryController } = require("../../controller");
const { authorization } = require("../../middlewares");
const { errorWrap } = require("../../utils");

const { addExerciseById, deleteExerciseById, getExercisesByDate } =
  diaryController;
const { addExerciseBodySchema, getExerciseSchema } = schemasExercise;

router.get(
  "/exercises",
  authorization,
  validateBody(getExerciseSchema),
  errorWrap(getExercisesByDate)
);

router.post(
  "/exercises/:id",
  authorization,
  isValidId,
  validateBody(addExerciseBodySchema),
  errorWrap(addExerciseById)
);

router.delete("/exercises/:id", authorization, errorWrap(deleteExerciseById));

module.exports = router;
