module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "script",
  },
  extends: ["eslint:recommended", "prettier"],
  env: {
    es2021: true,
    node: true,
  },
  rules: {
    "no-console": "error",
  },
};
