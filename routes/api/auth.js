const express = require("express");
const { validateBody, authorization, upload } = require("../../middlewares");
const { schemasUser } = require("../../models");
const { Auth } = require("../../controller");
const { errorWrap } = require("../../utils");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemasUser.registerSchema),
  errorWrap(Auth.register),
);
router.post(
  "/login",
  validateBody(schemasUser.loginSchema),
  errorWrap(Auth.login),
);
router.get("/current", authorization, errorWrap(Auth.current));
router.post("/logout", authorization, errorWrap(Auth.logout));

module.exports = router;
