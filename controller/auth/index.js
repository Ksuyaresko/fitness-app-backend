const register = require("./register");
const login = require("./login");
const current = require("./current");
const logout = require("./logout");
const settingsPut = require("./settings");
const avatar = require("./avatar");
const { verifyEmail, resendVerifyEmail } = require("./verify");
const refresh = require("./refresh");

module.exports = {
  register,
  login,
  current,
  logout,
  settingsPut,
  avatar,
  verifyEmail,
  resendVerifyEmail,
  refresh,
};
