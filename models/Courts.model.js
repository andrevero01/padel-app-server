const { Schema, model, ObjectId } = require("mongoose");

const courtSchema = new Schema({
  _id: ObjectId,
  name: String,
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

const Court = model("Court", courtSchema);

module.exports = Court;
