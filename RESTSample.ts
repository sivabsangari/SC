/*
Retrieve all users:
curl http://localhost:3000/users
Retrieve a single user by ID:
curl http://localhost:3000/users/1
Create a new user:
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "Alice", "email": "alice@example.com"}'
Update a user by ID:
curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name": "John Updated", "email": "john.updated@example.com"}'
Delete a user by ID:
curl -X DELETE http://localhost:3000/users/1



*/

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store users
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// Routes

// GET /users - Retrieve all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id - Retrieve a single user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// POST /users - Create a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Update an existing user by ID
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');

  user.name = req.body.name;
  user.email = req.body.email;
  res.json(user);
});

// DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
