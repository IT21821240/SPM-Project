const express = require("express");
const {
  getDiseases,
  getDiseaseById,
  createDisease,
  updateDisease,
  deleteDisease,
} = require("../controllers/diseaseController");

const router = express.Router();

// Route to get all diseases (protected)
router.get("/disease", getDiseases);

// Route to get a disease by ID (protected)
router.get("/disease/:id", getDiseaseById);

// Route to create a new disease (protected)
router.post("/disease", createDisease);

// Route to update an existing disease by ID (protected)
router.put("/disease/:id", updateDisease);

// Route to delete a disease by ID (protected)
router.delete("/disease/:id", deleteDisease);

module.exports = router;
