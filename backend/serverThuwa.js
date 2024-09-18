const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Ensure this path is correct

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/users', require('./routes/userRoutes')); // Ensure the path is correct
// Define other routes if necessary
app.use('/api/diseases', require('./routes/diseaseRoutes')); // Example route

app.get('/', (req, res) => {
  res.send('Plant Disease Diagnosis API is running...');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
