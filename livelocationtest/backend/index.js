const express = require('express');
const cors = require('cors');
const fs = require('fs');
const WebSocket = require('ws');
const path = require('path');

const app = express();
app.use(cors());

const PORT = 5001;

// 🔹 Serve static route files like /api/route/1 to /api/route/19
app.get('/api/route/:id', (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, 'data', `route${id}.json`);

  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
  } else {
    res.status(404).json({ error: 'Route not found' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 🔹 Setup WebSocket for 19 buses
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  const intervals = [];

  // Load all 19 routes
  for (let busId = 1; busId <= 19; busId++) {
    const filePath = path.join(__dirname, 'data', `route${busId}.json`);
    if (!fs.existsSync(filePath)) continue;

    const route = JSON.parse(fs.readFileSync(filePath));
    const coordinates = route.coordinates;
    let i = 0;

    // Send a point every 2s for each bus
    const interval = setInterval(() => {
      if (i < coordinates.length) {
        ws.send(JSON.stringify({
          routeId: route.routeId,
          coord: coordinates[i]
        }));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    intervals.push(interval);
  }

  ws.on('close', () => {
    console.log('Client disconnected');
    intervals.forEach(clearInterval);
  });
});
