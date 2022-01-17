const mongoose = require("mongoose");
const validator = require("validator");
const User = mongoose.model(
  "Users",
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error(`password should not contain "password" `);
        }
      },
    },
    DOB: {
      // type: Date,
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "don't want to say", "other"],
      required: true,
    },
    avatar: {
      type: Buffer,
    },
  }
  //   { timestamps: true }
);

module.exports = User;
