const Feedback = require('../models/feedback');
const mongoose = require('mongoose');

const createFeedback =  async (req, res) => {
    const { name, feedback } = req.body;
    const newFeedback = new Feedback({ name, feedback });
    try {
        await newFeedback.save();
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(500).json({ message: "Failed to save feedback", error });
    }
};

// Get feedback
const getFeedback =  async (req, res) => {
    try {
        const feedbackList = await Feedback.find();
        res.status(200).json(feedbackList);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch feedback", error });
    }
};

module.exports = {createFeedback, getFeedback};