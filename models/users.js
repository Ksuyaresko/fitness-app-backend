const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

emailReqexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const setting = new Schema({
  height: { type: Number, min: [150, 'min is 150'] },
  currentWeight: { type: Number, min: 35 },
  desiredWeight: { type: Number, min: 35 },
  birthday: { type: Date },
  blood: { type: Number, enum: [1, 2, 3, 4] },
  sex: { type: String, enum: ["male", "female"] },
  levelActivity: { type: Number, enum: [1, 2, 3, 4, 5] },
});

const user = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return emailReqexp.test(v);
        },
        message: (props) => `${props.value} Email is invalid`,
      },
      required: [true, "Email is required"],
      unique: true,
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
    dailyCalories: Number,
    dailyActivity: Number,
    settings: setting,
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().regex(emailReqexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().regex(emailReqexp).required(),
});

const settingSchema = Joi.object({
  name: Joi.string().required(),
  height: Joi.number().min(150).required(),
  currentWeight: Joi.number().min(35).required(),
  desiredWeight: Joi.number().min(35).required(),
  // @todo check 18+
  birthday: Joi.date().iso().required(),
  blood: Joi.number().valid(1, 2, 3, 4).required(),
  sex: Joi.number().valid("male", "female").required(),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
  settingSchema,
};

const User = mongoose.model("user", user);

module.exports = {
  User,
  schemas,
};
