const Fertilizer = require('../models/Fertilizer');

// Create Fertilizer
exports.createFertilizer = async (req, res) => {
  try {
    const { name, type, description, nutrientContent, imageUrl } = req.body;

    // Create a new fertilizer with the provided data
    const fertilizer = new Fertilizer({
      name,
      type,
      description,
      nutrientContent,
      imageUrl,  
    });

    await fertilizer.save();
    res.status(201).json(fertilizer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Fertilizers
exports.getAllFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find();
    res.status(200).json(fertilizers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Fertilizer by ID
exports.getFertilizerById = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findById(req.params.id);
    if (!fertilizer) {
      return res.status(404).json({ error: 'Fertilizer not found' });
    }
    res.status(200).json(fertilizer);
  } catch (error) {
    res.status(404).json({ error: 'Fertilizer not found' });
  }
};

// Update Fertilizer
exports.updateFertilizer = async (req, res) => {
  try {
    const { name, type, description, nutrientContent, imageUrl } = req.body;

    const fertilizer = await Fertilizer.findByIdAndUpdate(
      req.params.id,
      { name, type, description, nutrientContent, imageUrl },
      { new: true } // Return the updated document
    );

    if (!fertilizer) {
      return res.status(404).json({ error: 'Fertilizer not found' });
    }

    res.status(200).json(fertilizer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Fertilizer
exports.deleteFertilizer = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findByIdAndDelete(req.params.id);
    if (!fertilizer) {
      return res.status(404).json({ error: 'Fertilizer not found' });
    }
    res.status(200).json({ message: 'Fertilizer deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
