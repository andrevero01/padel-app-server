const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const leagueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teams: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    season: {
      type: String,
    },
    location: {
      type: String,
    },
    schedule: {
      type: String,
    }, // Calender API?
    registrationOpen: {
      type: Boolean,
      default: false,
    },
    registrationDeadline: {
      type: Date,
    },
    registrationFee: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const League = model("League", leagueSchema);

module.exports = { League };
