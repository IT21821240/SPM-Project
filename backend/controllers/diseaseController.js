const Disease = require('../models/Disease');
const mongoose = require('mongoose');

// Function to get all diseases
const getDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json({
      message: 'Diseases retrieved successfully',
      data: diseases
    });
  } catch (err) {
    console.error('Error fetching diseases:', err.message);
    res.status(500).json({ message: 'An error occurred while fetching diseases. Please try again later.' });
  }
};

// Function to create a new disease
const createDisease = async (req, res) => {
  const { name, symptoms, affectedSpecies, treatment, severity } = req.body;

  // Create a new disease instance
  const disease = new Disease({
    name,
    symptoms,
    affectedSpecies,
    treatment,
    severity
  });

  try {
    const savedDisease = await disease.save();
    res.status(201).json({
      message: `Disease '${name}' created successfully`,
      data: savedDisease
    });
  } catch (err) {
    console.error('Error creating disease:', err.message);
    res.status(400).json({ message: 'Failed to create the disease. Please check your input and try again.' });
  }
};

// Function to get a disease by ID
const getDiseaseById = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid disease ID provided. Please check the ID and try again.' });
    }

    const disease = await Disease.findById(id);
    if (!disease) {
      return res.status(404).json({ message: `Disease with ID '${id}' not found.` });
    }

    res.json({
      message: `Disease '${disease.name}' retrieved successfully`,
      data: disease
    });
  } catch (err) {
    console.error('Error fetching disease by ID:', err.message);
    res.status(500).json({ message: 'An error occurred while fetching the disease. Please try again later.' });
  }
};

// Function to update an existing disease by ID
const updateDisease = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid disease ID provided. Please check the ID and try again.' });
    }

    // Find and update the disease
    const updatedDisease = await Disease.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedDisease) {
      return res.status(404).json({ message: `Disease with ID '${id}' not found. Update failed.` });
    }

    res.json({
      message: `Disease '${updatedDisease.name}' updated successfully`,
      data: updatedDisease
    });
  } catch (err) {
    console.error('Error updating disease:', err.message);
    res.status(400).json({ message: 'Failed to update the disease. Please check your input and try again.' });
  }
};

// Function to delete a disease by ID
const deleteDisease = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid disease ID provided. Please check the ID and try again.' });
    }

    // Find and delete the disease
    const deletedDisease = await Disease.findByIdAndDelete(id);

    if (!deletedDisease) {
      return res.status(404).json({ message: `Disease with ID '${id}' not found. Deletion failed.` });
    }

    res.json({ message: `Disease '${deletedDisease.name}' deleted successfully.` });
  } catch (err) {
    console.error('Error deleting disease:', err.message);
    res.status(500).json({ message: 'An error occurred while deleting the disease. Please try again later.' });
  }
};

module.exports = {
  getDiseases,
  createDisease,
  getDiseaseById,   
  updateDisease,
  deleteDisease
};
