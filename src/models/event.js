const mongoose = require("mongoose");
const validator = require("validator");

const Event = mongoose.model("Events", {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },

  organizer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  place: {
    type: String,
    trim: true,
    required: true,
  },
  participants: [
    {
      participant: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],
  maximumParticipants: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
module.exports = Event;
