const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    name: String,
    feedback: String,
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;