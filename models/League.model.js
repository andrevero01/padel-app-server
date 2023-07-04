const { Schema, model, ObjectId } = require("mongoose");

const leagueSchema = new Schema({
  name: String,
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  courts: [String],
});

const League = model("League", leagueSchema);

module.exports = League;
