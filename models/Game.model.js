const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    players: {
      player1: {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
      player2: {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
      player3: {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
      player4: {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    },
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
      rounds: [
        {
          sets: [
            {
              games: [
                {
                  type: String,
                  default: "0-0",
                },
              ],
            },
          ],
        },
      ],
    },
    winners: {
      winner1: {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
      winner2: {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    },
    losers: {
      loser1: {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
      loser2: {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    },
    duration: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Game = model("Game", gameSchema);

module.exports = model("Game", gameSchema);
