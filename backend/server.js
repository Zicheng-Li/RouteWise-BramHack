const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:4200', 
  methods: 'GET,POST', 
  allowedHeaders: 'Content-Type,Authorization', 
};
app.use(cors(corsOptions));

const GOOGLE_MAPS_API_KEY = '';

app.post('/directions', async (req, res) => {
  try {
    const { origin, destination, waypoints, mode } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required.' });
    }

    const directionsApiUrl = 'https://maps.googleapis.com/maps/api/directions/json';

    const params = {
      origin,
      destination,
      mode: mode || 'driving', 
      key: GOOGLE_MAPS_API_KEY,
    };

    if (waypoints && Array.isArray(waypoints) && waypoints.length > 0) {
      params.waypoints = waypoints.join('|'); 
    }

    const response = await axios.get(directionsApiUrl, { params });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching directions:', error.message);

    if (error.response) {
      // Google Maps API responded with an error
      return res.status(error.response.status).json(error.response.data);
    }

    res.status(500).json({ error: 'Failed to fetch directions.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
