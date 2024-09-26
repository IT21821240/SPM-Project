const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const PlantRoute = require("./routes/plantRoute");
const DiseaseRoute = require("./routes/diseaseRoute");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", UserRoute);
app.use("/api/plants", PlantRoute);
app.use("/api/diseases", DiseaseRoute);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("🔌 Connected to the Database");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server is running on Port ${PORT}`);
});

module.exports = app;
