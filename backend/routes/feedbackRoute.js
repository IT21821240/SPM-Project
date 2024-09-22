const express = require("express");
const { createFeedback, getFeedback } = require("../controllers/feedbackController");
const router = express.Router();

router.get("/getFeedback", getFeedback);

router.post("/createFeedback", createFeedback);

module.exports = router;