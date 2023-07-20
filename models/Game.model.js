const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const gameSchema = new Schema(
  {
    date: {
      type: Date,
    },
    teams: [
      {
        players: [
          {
            type: Schema.Types.ObjectId,
            ref: "Player",
          },
        ],
      },
    ],
    score: {
      sets: {
        type: Number,
        enum: [1, 3, 5, 7],
      },
      games: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6],
      },
      points: {
        type: String,
        enum: [15, 30, 40, "advantage", "deuce"],
      },
    },
    courts: {
      type: Schema.Types.ObjectId,
      ref: "Court",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Game", gameSchema);
