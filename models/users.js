const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

emailReqexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const setting = new Schema({
  height: { type: Number, min: [150, 'min is 150'] }, // number; minimum 150(cm); required
  currentWeight: { type: Number, min: 35 }, // number; minimum 35(kg); required
  desiredWeight: { type: Number, min: 35 }, // number; minimum 35(kg); required
  birthday: { type: Date }, // - date; must be older than 18 years;  required
  blood: { type: Number, enum: [1, 2, 3, 4] }, // number; allowed values 1, 2, 3, 4; required
  sex: { type: String, enum: ["male", "female"] }, // string; allowed values "male", "female"; required
  levelActivity: { type: Number, enum: [1, 2, 3, 4] }, // - number; allowed values 1, 2, 3, 4, 5; required
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
    setting: setting,
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().regex(emailReqexp).required,
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
  height: Joi.number().min(150).required(),
  currentWeight: Joi.number().min(35).required(),
  desiredWeight: Joi.number().min(35).required(),
  birthday: Joi.date().iso(),
  blood: Joi.number().valid(1, 2, 3, 4),
  sex: Joi.number().valid("male", "female"),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5),
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
