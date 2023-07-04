const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  league: {
    type: Schema.Types.ObjectId,
    ref: "League",
    required: true,
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  ],
  court: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Game", GameSchema);
