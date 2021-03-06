const bcrypt = require("bcryptjs"); //Hashing mechanism
const mongoose = require("mongoose");
const validator = require("validator"); //To validate the user data
const jwt = require("jsonwebtoken"); //Json token genration module
const Event = require("./event");
const userSchema = new mongoose.Schema({
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

  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
  avatar: {
    type: Buffer,
  },
});

userSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "owner",
});

//Returning user profile to client

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;
  return userObject;
};

//To generate tokens

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.MYTOKEN);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//To login

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

//Hash the password before saving

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Delete user events when user is removed cascading deletion

userSchema.pre("remove", async function (next) {
  const user = this;
  await Event.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
