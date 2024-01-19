const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middlewares");
const { schemasExercise } = require("../../models");

const { diaryController } = require("../../controller");
const { authorization, isValidId } = require("../../middlewares");
const { errorWrap } = require("../../utils");

const { addExerciseById, deleteExerciseById } = diaryController;
const { addExerciseBodySchema } = schemasExercise;

router.post(
  "/exercises",
  authorization,
  validateBody(addExerciseBodySchema),
  errorWrap(addExerciseById)
);

router.delete(
  "/exercises/:id",
  authorization,
  isValidId,
  errorWrap(deleteExerciseById)
);

module.exports = router;
