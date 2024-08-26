/*
Create an Item:
curl -X POST http://localhost:3000/items -H "Content-Type: application/json" -d '{"name": "New Item", "description": "Description of New Item"}'
Get All Items:
curl http://localhost:3000/items
Get an Item by ID:
curl http://localhost:3000/items/1
Update an Item:
curl -X PUT http://localhost:3000/items/1 -H "Content-Type: application/json" -d '{"name": "Updated Item", "description": "Updated Description"}'
Delete an Item:
curl -X DELETE http://localhost:3000/items/1

*/

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store data
let items = [
  { id: 1, name: 'Item 1', description: 'Description of Item 1' },
  { id: 2, name: 'Item 2', description: 'Description of Item 2' }
];

// ------------------
// CRUD Operations
// ------------------

// Create (POST) - Add a new item
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  const newItem = {
    id: items.length + 1,
    name,
    description
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read (GET) - Retrieve all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Read (GET) - Retrieve a single item by ID
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

// Update (PUT) - Update an existing item by ID
app.put('/items/:id', (req, res) => {
  const { name, description } = req.body;
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  item.name = name || item.name;
  item.description = description || item.description;
  res.json(item);
});

// Delete (DELETE) - Remove an item by ID
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item not found');

  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
