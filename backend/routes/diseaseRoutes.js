const express = require('express');
const { getDiseases, getDiseaseById, createDisease, updateDisease, deleteDisease } = require('../controllers/diseaseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get all diseases (protected)
router.get('/', authMiddleware, getDiseases);

// Route to get a disease by ID (protected)
router.get('/:id', authMiddleware, getDiseaseById);

// Route to create a new disease (protected)
router.post('/', authMiddleware, createDisease);

// Route to update an existing disease by ID (protected)
router.put('/:id', authMiddleware, updateDisease);

// Route to delete a disease by ID (protected)
router.delete('/:id', authMiddleware, deleteDisease);

module.exports = router;
