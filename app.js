const express = require('express');
const axios = require('axios');

const app = express();
const MONDAY_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2NjA2MTI1NSwiYWFpIjoxMSwidWlkIjoxNzM1ODE1NCwiaWFkIjoiMjAyMi0wNi0xN1QwNTo0NjowMC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6Njc3NzM2MCwicmduIjoidXNlMSJ9.kHYwChnla-HsIRnc8fvtr1x4O8jp6xFLz-XRPZyYQNg';

app.post('/webhook', async (req, res) => {
  try {
    // Extract necessary information from the webhook request
    const { event, payload } = req.body;

    // Authenticate with Monday.com API
    const headers = {
      'Authorization': MONDAY_API_KEY,
    };

    // Retrieve the board details
    const boardId = payload.boardId;
    const boardUrl = `https://api.monday.com/v2/boards/${boardId}`;
    const boardResponse = await axios.get(boardUrl, { headers });
    const boardDetails = boardResponse.data;

    // Retrieve the current items
    const itemsUrl = `https://api.monday.com/v2/boards/${boardId}/items`;
    const itemsResponse = await axios.get(itemsUrl, { headers });
    const currentItems = itemsResponse.data;

    // Process and use the retrieved data
    // ... (perform actions or store the data as needed)

    res.sendStatus(200);
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Webhook handler listening on port 3000');
});
