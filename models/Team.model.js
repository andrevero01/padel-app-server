const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    captain: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
    courts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Court",
      },
    ],
    leagues: [
      {
        type: Schema.Types.ObjectId,
        ref: "League",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Team", teamSchema);
