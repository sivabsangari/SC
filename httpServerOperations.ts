const http = require('http');

// Create the server
const server = http.createServer((req, res) => {
  // Parse the URL
  const url = req.url;
  const method = req.method;

  // Set a common header
  res.setHeader('Content-Type', 'application/json');

  // Handle different request types
  if (url === '/' && method === 'GET') {
    // Handle GET request to the root URL
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Welcome to the Home Page!' }));

  } else if (url === '/about' && method === 'GET') {
    // Handle GET request to the /about URL
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'This is the About Page!' }));

  } else if (url === '/data' && method === 'POST') {
    // Handle POST request to /data URL
    let body = '';
    
    // Collect data from the request body
    req.on('data', chunk => {
      body += chunk.toString(); // Convert Buffer to string
    });

    // Respond once all data is received
    req.on('end', () => {
      const parsedBody = JSON.parse(body); // Assume JSON input
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Data received!', data: parsedBody }));
    });

  } else if (url === '/update' && method === 'PUT') {
    // Handle PUT request to /update URL
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Update successful!' }));

  } else if (url === '/delete' && method === 'DELETE') {
    // Handle DELETE request to /delete URL
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Resource deleted!' }));

  } else {
    // Handle unknown routes
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found!' }));
  }
});

// Define the port and start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
