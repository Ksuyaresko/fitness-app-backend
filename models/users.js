const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

emailReqexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const HEIGHT_MIN = 150;
const WEIGHT_MIN = 35
const BLOOD_ENUM = [1, 2, 3, 4]
const SEX_ENUM = ["male", "female"]
const ACTIVITY_ENUM = [1, 2, 3, 4, 5]

const setting = new Schema({
  height: { type: Number, min: [HEIGHT_MIN, 'min is 150'] },
  currentWeight: { type: Number, min: WEIGHT_MIN },
  desiredWeight: { type: Number, min: WEIGHT_MIN },
  birthday: { type: Date },
  blood: { type: Number, enum: BLOOD_ENUM },
  sex: { type: String, enum: SEX_ENUM },
  levelActivity: { type: Number, enum: ACTIVITY_ENUM },
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
  height: Joi.number().min(HEIGHT_MIN).required(),
  currentWeight: Joi.number().min(WEIGHT_MIN).required(),
  desiredWeight: Joi.number().min(WEIGHT_MIN).required(),
  birthday: Joi.date().iso().required(),
  blood: Joi.number().valid(...BLOOD_ENUM).required(),
  sex: Joi.number().valid(...SEX_ENUM).required(),
  levelActivity: Joi.number().valid(...ACTIVITY_ENUM).required(),
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
