const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const playerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
    },
    name: { type: String, required: true },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    nationality: {
      type: String,
    },
    club: {
      type: String,
    },
    handedness: {
      type: String,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    dominantHand: {
      type: String,
    },
    backhandType: {
      type: String,
    },
    playingStyle: {
      type: String,
    },
    experienceLevel: {
      type: String,
    },
    coach: {
      type: String,
    },
    tournaments: [
      {
        name: {
          type: String,
        },
        location: {
          type: String,
        },
        date: {
          type: Date,
        },
        result: {
          type: String,
        },
      },
    ],
    achievements: [
      {
        title: {
          type: String,
        },
        year: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Player = model("Player", playerSchema);

module.exports = { Player };
