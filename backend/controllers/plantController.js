const Plant = require("../models/Plant");
const cloudinary = require("../config/cloudinary");

// Controller function to create a new plant
const createPlant = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      name,
      scientificName,
      family,
      origin,
      description,
      careInstructions,
      bloomTime,
      height,
      price,
      imageData,
    } = req.body;

    let imageUrl = "tesr";

    if (imageData) {
      //Check if the imageData is a valid base64 image
      if (!imageData.startsWith("data:image")) {
        return res.status(400).json({ error: "Invalid image format" });
      }

      // Extract the file type from the base64 string
      const fileType = imageData.split(";")[0].split("/")[1];

      // List of allowed image types
      const allowedTypes = ["jpeg", "jpg", "png"];

      if (!allowedTypes.includes(fileType)) {
        return res.status(400).json({ error: "Invalid image type" });
      }

      // Upload image to Cloudinary
      try {
        const uploadResponse = await cloudinary.uploader.upload(imageData, {
          folder: "Plants",
        });
        imageUrl = uploadResponse.secure_url;
      } catch (uploadError) {
        return res.status(500).json({ error: "Failed to upload an image" });
      }
    }

    // Create a new Plant instance
    const newPlant = new Plant({
      name,
      scientificName,
      family,
      origin,
      description,
      careInstructions,
      bloomTime,
      height,
      price,
      imageUrl,
      dateAdded: new Date(), // This will use the default if not provided
    });

    // Save the plant to the database
    await newPlant.save();

    // Respond with the created plant object
    res.status(201).json(newPlant); // 201 Created
  } catch (error) {
    res.status(400).json({ error: error.message }); // 400 Bad Request
  }
};

// Controller function to get all plants
const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants); // 200 OK
  } catch (error) {
    res.status(500).json({ error: error.message }); // 500 Internal Server Error
  }
};

// Controller function to get a plant by ID
const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a plant by ID
const deletePlant = async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);

    if (!deletedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.status(200).json({ message: "Plant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a plant by ID
const updatePlant = async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.status(200).json(updatedPlant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPlant,
  getAllPlants,
  deletePlant,
  getPlantById,
  updatePlant,
};
// export default { createPlant, getAllPlants }
