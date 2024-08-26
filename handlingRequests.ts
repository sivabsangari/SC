/*
Create a New Item:
curl -X POST http://localhost:3000/itemsToHandle -H "Content-Type: application/json" -d '{"name": "New Item", "description": "New Description"}'
Get All itemsToHandle:
curl http://localhost:3000/itemsToHandle
Get an Item by ID:
curl http://localhost:3000/itemsToHandle/1

Update an Item:
curl -X PUT http://localhost:3000/itemsToHandle/1 -H "Content-Type: application/json" -d '{"name": "Updated Item", "description": "Updated Description"}'
Delete an Item:
curl -X DELETE http://localhost:3000/itemsToHandle/1

*/

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory store for demonstration purposes
let itemsToHandle = [
  { id: 1, name: 'Item 1', description: 'Description of Item 1' },
  { id: 2, name: 'Item 2', description: 'Description of Item 2' }
];

// Handle POST requests and parse JSON data
app.post('/itemsToHandle', (req, res) => {
  const { name, description } = req.body;

  // Validate input
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  // Create a new item
  const newItem = {
    id: itemsToHandle.length + 1,
    name,
    description
  };
  itemsToHandle.push(newItem);
  
  // Send response
  res.status(201).json(newItem);
});

// Handle GET requests to retrieve all itemsToHandle
app.get('/itemsToHandle', (req, res) => {
  res.json(itemsToHandle);
});

// Handle GET requests to retrieve a single item by ID
app.get('/itemsToHandle/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = itemsToHandle.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(item);
});

// Handle PUT requests to update an item by ID
app.put('/itemsToHandle/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  
  // Validate input
  if (!name && !description) {
    return res.status(400).json({ error: 'At least one of name or description is required' });
  }

  const item = itemsToHandle.find(i => i.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  if (name) item.name = name;
  if (description) item.description = description;
  
  res.json(item);
});

// Handle DELETE requests to remove an item by ID
app.delete('/itemsToHandle/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = itemsToHandle.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const deletedItem = itemsToHandle.splice(index, 1);
  res.json(deletedItem[0]);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
