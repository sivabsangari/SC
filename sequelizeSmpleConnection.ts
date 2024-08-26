
const User = require('./models/user');
const sequelize = require('./models/index');
require('dotenv').config();



// Middleware to parse JSON bodies
app.use(express.json());

// Synchronize models with the database
sequelize.sync({ force: false }) // Change to `true` if you want to drop and re-create the tables on every sync
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Error synchronizing database:', err));

// ------------------
// CRUD Operations
// ------------------

// Create (POST) - Add a new user
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Read (GET) - Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Read (GET) - Get a user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update (PUT) - Update a user's details
app.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update({ name, email });
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete (DELETE) - Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// ------------------
// Start the Server
// ------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
