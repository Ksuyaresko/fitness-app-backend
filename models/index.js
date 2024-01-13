const { User, schemas: schemasUser } = require("./users");

const { Product } = require("./products");

const {Exercise} = require('./exercises')

const { Diary } = require("./diary-exercise-schema")

module.exports = { User, schemasUser, Product, Exercise, Diary };

