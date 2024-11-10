const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Add CORS middleware
const corsOptions = {
  origin: 'http://localhost:4200', // Allow requests from your Angular frontend
  methods: 'GET,POST', // Allow GET and POST requests
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
};
app.use(cors(corsOptions));

// Google Maps API Key (replace with your actual API key)
const GOOGLE_MAPS_API_KEY = '***REMOVED***';

// POST Endpoint to handle directions requests
app.post('/directions', async (req, res) => {
  try {
    // Extract request body parameters
    const { origin, destination, waypoints, mode } = req.body;

    // Validate required parameters
    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required.' });
    }

    // Google Maps Directions API URL
    const directionsApiUrl = 'https://maps.googleapis.com/maps/api/directions/json';

    // Construct query parameters
    const params = {
      origin,
      destination,
      mode: mode || 'driving', // Default to driving if no mode is provided
      key: GOOGLE_MAPS_API_KEY,
    };

    // Add waypoints if provided
    if (waypoints && Array.isArray(waypoints) && waypoints.length > 0) {
      params.waypoints = waypoints.join('|'); // Join waypoints with '|'
    }

    // Make the request to the Google Maps Directions API
    const response = await axios.get(directionsApiUrl, { params });

    // Return the API response to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching directions:', error.message);

    // Handle different error cases
    if (error.response) {
      // Google Maps API responded with an error
      return res.status(error.response.status).json(error.response.data);
    }

    // Other unexpected errors
    res.status(500).json({ error: 'Failed to fetch directions.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
