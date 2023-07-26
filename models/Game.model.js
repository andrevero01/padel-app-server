const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const gameSchema = new Schema(
  {
    date: {
      type: Date,
    },
    teams: [
      {
        name: {
          type: String,
        },
        players: [
          {
            type: Schema.Types.ObjectId,
            ref: "Player",
          },
        ],
        winner: {
          type: Boolean,
        },
        score: {
          sets: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5, 6, 7],
          },
          games: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5, 6],
          },
          points: {
            type: String,
            enum: [0, 15, 30, 40, "advantage", "deuce"],
          },
        },
      },
    ],
    courts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Court",
      },
    ],
    matchType: {
      type: String,
      enum: ["Singles", "Doubles", "Mixed doubles", "Practice", "League"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Game", gameSchema);
