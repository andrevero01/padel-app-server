const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const courtSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amenities: {
      restrooms: {
        type: Boolean,
        default: false,
      },
      showers: {
        type: Boolean,
        default: false,
      },
      lockerRooms: {
        type: Boolean,
        default: false,
      },
      waterFountain: {
        type: Boolean,
        default: false,
      },
      snackBar: {
        type: Boolean,
        default: false,
      },
      equipmentRental: {
        type: Boolean,
        default: false,
      },
      scoreboard: {
        type: Boolean,
        default: false,
      },
      firstAidKit: {
        type: Boolean,
        default: false,
      },
      parking: {
        type: Boolean,
        default: false,
      }
    },
    lighting: {
      type: String,
      enum: ["Excellent", "Very good ", "Good", "Fair", "Poor"],
    },
    surface: {
      type: String,
      enum: ["Excellent", "Very good ", "Good", "Fair", "Poor"],
    },
    seating: {
      type: String,
      enum: ["Excellent", "Very good ", "Good", "Fair", "Poor"],
    },
    cleanliness: {
      type: String,
      enum: ["Excellent", "Very good ", "Good", "Fair", "Poor"],
    },
    maintenance: {
      type: String,
      enum: ["Excellent", "Very good ", "Good", "Fair", "Poor"],
    },
  },
  {
    timestamps: true,
  }
);

const Court = model("Court", courtSchema);

module.exports = { Court };
