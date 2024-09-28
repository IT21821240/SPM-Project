// routes/fertilizerRoutes.js
const express = require('express');
const router = express.Router();
const fertilizerController = require('../controllers/FertilizerController');

// Create Fertilizer
router.post('/', fertilizerController.createFertilizer);

// Get All Fertilizers
router.get('/', fertilizerController.getAllFertilizers);

// Get Fertilizer by ID
router.get('/:id', fertilizerController.getFertilizerById);

// Update Fertilizer
router.put('/:id', fertilizerController.updateFertilizer);

// Delete Fertilizer
router.delete('/:id', fertilizerController.deleteFertilizer);

module.exports = router;
