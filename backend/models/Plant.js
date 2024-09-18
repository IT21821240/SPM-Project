const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
    required: true,
  },
  family: {
    type: String,
  },
  origin: {
    type: String,
  },
  description: {
    type: String,
  },
  careInstructions: {
    sunlight: {
      type: String,
      enum: ["Full Sun", "Partial Shade", "Full Shade"],
    },
    waterFrequency: {
      type: String,
      enum: ["Daily", "Weekly", "Biweekly", "Monthly"],
    },
    soilType: {
      type: String,
    },
    temperatureRange: {
      min: { type: Number },
      max: { type: Number },
    },
  },
  bloomTime: {
    type: String,
  },
  height: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
