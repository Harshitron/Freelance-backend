require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS configuration to allow requests only from your frontend's URL
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Define a schema for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  experience: String,
  qualification: String,
});

// Create a model for the form data
const FormData = mongoose.model('FormData', formDataSchema);

// Define a route to handle form submissions
app.post('/submit', async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(200).send({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send({ error: 'Failed to save data' });
  }
});

// New route to fetch all submissions
app.get('/submissions', async (req, res) => {
  try {
    const submissions = await FormData.find();
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).send({ error: 'Failed to fetch submissions' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));