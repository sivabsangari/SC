const express = require('express');
const app = express();

// Middleware to log each request
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next handler
};

// Middleware to parse JSON request bodies
app.use(express.json()); // Built-in middleware to parse JSON
app.use(requestLogger); // Use the custom logging middleware

// ------------------
// Routing Logic
// ------------------

// GET request to the root route
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

// GET request to the /about route
app.get('/about', (req, res) => {
  res.send('This is the About Page!');
});

// POST request to /data route
app.post('/data', (req, res) => {
  const data = req.body; // Access the parsed JSON data from the request
  res.json({ message: 'Data received!', receivedData: data });
});

// PUT request to /update route
app.put('/update', (req, res) => {
  res.json({ message: 'Resource updated successfully!' });
});

// DELETE request to /delete route
app.delete('/delete', (req, res) => {
  res.json({ message: 'Resource deleted successfully!' });
});

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).send('Route not found!');
});

// ------------------
// Start the Server
// ------------------
const EXPRESSPORT = 3000;
app.listen(EXPRESSPORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
