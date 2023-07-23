const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const leagueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    schedule: {
      type: String,
    },
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
    leagueLogo: {
      type: String,
      default:
        "https://www.usaclicosenza.it/wp-content/uploads/2021/04/Padel-League-Logo.jpeg",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("League", leagueSchema);
