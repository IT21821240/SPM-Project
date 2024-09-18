const express = require("express");

const PlantController = require("../controllers/plantController.js");

const plantrouter = express.Router();

plantrouter.post("/", PlantController.createPlant);
plantrouter.get("", PlantController.getAllPlants);
plantrouter.delete("/:id", PlantController.deletePlant);
plantrouter.get("/:id", PlantController.getPlantById);
plantrouter.put("/:id", PlantController.updatePlant);

module.exports = plantrouter;
// export default router;
