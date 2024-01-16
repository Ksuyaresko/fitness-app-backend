const express = require("express");
const router = express.Router();

const { diaryController } = require("../../controller");
const { authorization } = require("../../middlewares");
const { errorWrap } = require("../../utils");

router.get("/", authorization, errorWrap(diaryController.allDiaryByDate));

module.exports = router;
