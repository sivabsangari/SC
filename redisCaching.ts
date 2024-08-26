
import redis from 'redis';

const redisClient = redis.createClient();

// Simulated database query function
function fetchDataFromDatabase(id) {
  // Simulate a slow database query (e.g., fetching data from a relational database)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, data: `Data for ID ${id}` });
    }, 2000); // Simulate a 2-second delay
  });
}

// Middleware to check the cache
function cacheMiddleware(req, res, next) {
  const { id } = req.params;

  redisClient.get(id, (err: any, data: string | null) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }
    if (data !== null) {
      // Cache hit, return cached data
      return res.json(JSON.parse(data));
    } else {
      // Cache miss, proceed to the next middleware
      next();
    }
  });
}

// Route to fetch data with caching
app.get('/data/:id', cacheMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch data from the "database"
    const data = await fetchDataFromDatabase(id);

    // Store the result in Redis with an expiration time (e.g., 1 hour)
    redisClient.setEx(id, 3600, JSON.stringify(data));

    // Send the data to the client
    res.json(data);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
