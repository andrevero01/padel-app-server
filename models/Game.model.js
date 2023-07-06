const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    player1: {
      type: String /* Schema.Types.ObjectId, */,
      ref: "Player",
    },
    player2: {
      type: String /* Schema.Types.ObjectId, */,
      ref: "Player",
    },
    /*
    court: {
      type: Schema.Types.ObjectId,
      ref: "Court",
    },
    league: {
      type: Schema.Types.ObjectId,
      ref: "League",
    },
    team1: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    team2: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    dateTime: {
      type: Date,
    },
    score: {
      type: String,
      default: "0-0",
    },
    winner: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
    duration: {
      type: Number,
    }, */
  },
  {
    timestamps: true,
  }
);

const Game = model("Game", gameSchema);

module.exports = { Game };
