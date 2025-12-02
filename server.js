/* server.js
Author: Konrad Szulc
Simple Express server to proxy Last.fm API requests and hide API key*/

// Load environment variables from .env file
require('dotenv').config();

// Import required modules express because we are building an Express server and cors to handle Cross-Origin Resource Sharing
const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();
// Define the port to run the server on as declared by Render or default to 3000
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (allows GitHub Pages to call this server)
app.use(cors());

// API proxy endpoint - forwards requests to Last.fm with the hidden API key
app.get('/api/lastfm', async (req, res) => {
    try {
        // Get the method and artist/album parameters from the query string
        const { method, artist, album } = req.query;

        // Build the Last.fm API URL with the hidden API key
        const apiKey = process.env.LASTFM_API_KEY;
        // Base URL for Last.fm API, adding method and format-json
        let url = `https://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${apiKey}&format=json`;

        // Add artist parameter if provided
        if (artist) {
            url += `&artist=${encodeURIComponent(artist)}`;
        }

        // Add album parameter if provided
        if (album) {
            url += `&album=${encodeURIComponent(album)}`;
        }

        // Fetch data from Last.fm API
        const response = await fetch(url);
        const data = await response.json();

        // Send the data back to the frontend
        res.json(data);

    } catch (error) {
        // Return error if something goes wrong
        res.status(500).json({ error: 'Failed to fetch data from Last.fm' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});