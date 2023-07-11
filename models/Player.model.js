const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const playerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      enum: ["User", "Player", "Captain"],
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to say"],
    },
    nationality: {
      type: String,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    dominantHand: {
      type: String,
      enum: ["Right", "Left", "Ambidextrous"],
    },
    backhandType: {
      type: String,
      enum: ["One-handed backhand", "Two-handed backhand"],
    },
    playingStyle: {
      type: String,
      enum: ["Offensive", "Control"],
    },
    experienceLevel: {
      type: Number,
      enum: ["1", "2", "3", "4", "5"],
    },
    coach: {
      type: String,
    },
    leagues: [
      {
        name: {
          type: Schema.Types.ObjectId,
          ref: "League",
        },
        location: {
          type: Schema.Types.ObjectId,
          ref: "League",
        },
        team: {
          type: Schema.Types.ObjectId,
          ref: "Team",
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
