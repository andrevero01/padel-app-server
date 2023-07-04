const { Schema, model } = require("mongoose");

const teamSchema = new Schema({
  name: String,
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  league: {
    type: Schema.Types.ObjectId,
    ref: "League",
  },
  statistics: {
    wins: Number,
    losses: Number,
  },
});

const Team = model("Team", teamSchema);

module.exports = Team;
