const mongoose = require('mongoose');

const FertilizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  nutrientContent: {
    nitrogen: { type: Number, default: 0 },
    phosphorus: { type: Number, default: 0 },
    potassium: { type: Number, default: 0 }
  },
  imageUrl: {
    type: String,
  }
});

module.exports = mongoose.model('Fertilizer', FertilizerSchema);
