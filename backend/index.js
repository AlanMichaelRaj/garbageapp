const express = require('express');
const mongoDB = require('./db');
const userRoutes = require('./Routes/createuser'); // Import the user routes
const loginRoutes = require('./Routes/loginuser'); // Import the login routes
const cors = require('cors');
const DisplayData = require('./Routes/displaydata'); 
const app = express();
require("dotenv").config();

const port = 5000;

// Connect to MongoDB
mongoDB();

// Parse JSON bodies (Middleware)
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend's origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Mount the routes
app.use('/api', userRoutes);
app.use('/api', DisplayData);  // Mount the user routes
app.use('/api', loginRoutes); // Mount the login routes

// Root route for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
