const express = require("express");

const { Statistics } = require("../../controller");
const { errorWrap } = require("../../utils");

const router = express.Router();

router.get("/", errorWrap(Statistics.getStatistics));

module.exports = router;
