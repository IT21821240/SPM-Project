const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'], 
        trim: true // Trims whitespace from the name
    },
    symptoms: { 
        type: [String], // List of symptoms, each symptom as a string
        required: [true, 'Symptoms are required'] 
    },
    affectedSpecies: { 
        type: [String], // List of plant species affected by the disease
        required: [true, 'Affected species are required'] 
    },
    treatment: { 
        type: String, 
        required: [true, 'Treatment is required'] 
    },
    severity: { 
        type: String, // Severity of the disease (e.g., Mild, Moderate, Severe)
        enum: ['Mild', 'Moderate', 'Severe'], 
        required: [true, 'Severity is required'], 
        default: 'Mild' // Default value for severity
    }
}, { 
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Disease', DiseaseSchema);
