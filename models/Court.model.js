const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const courtSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lighting: {
      type: String,
    },
    surface: {
      type: String,
    },
    size: {
      type: String,
    },
    nets: {
      type: String,
    },
    seating: {
      type: Boolean,
    },
    amenities: [
      {
        type: String,
      },
    ],
    cleanliness: {
      type: String,
    },
    maintenance: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    }, // Rating given by players (1-5 scale)
  },
  {
    timestamps: true,
  }
);

const Court = model("Court", courtSchema);

module.exports = model("Court", courtSchema);
