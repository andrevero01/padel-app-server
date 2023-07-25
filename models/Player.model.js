const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const playerSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   required: [true, "Username is required."],
    // },
    email: {
      type: String,
      // required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // required: [true, "Password is required."],
    },
    role: {
      type: String,
      enum: ["User", "Player", "Captain", ""],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to say", ""],
    },
    nationality: {
      type: String,
    },
    team: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    dominantHand: {
      type: String,
      enum: ["Right", "Left", "Ambidextrous", ""],
    },
    backhandType: {
      type: String,
      enum: ["One-handed backhand", "Two-handed backhand", ""],
    },
    playingStyle: {
      type: String,
      enum: ["Offensive", "Control", ""],
    },
    experienceLevel: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
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
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
      { timestamps: true }
    ],
    gamesWon: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Player", playerSchema);
