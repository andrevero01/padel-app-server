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
    wins: {
      type: Number,
      default: 0,
    },
    logo: {
      type: String, 
      default: "https://img.freepik.com/free-vector/hand-drawn-padel-logo-template_23-2149196492.jpg?w=2000",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Team", teamSchema);
