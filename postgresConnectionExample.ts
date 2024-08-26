const express = require('express');
const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Create a connection pool to PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// ------------------
// CRUD Operations
// ------------------

// Create (POST) - Add a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Read (GET) - Get all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Read (GET) - Get a user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update (PUT) - Update a user's details
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete (DELETE) - Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', user: result.rows[0] });
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
/*
Create a User (POST):
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'
Get All Users (GET):
curl http://localhost:3000/users

Get a User by ID (GET):
curl http://localhost:3000/users/1
Update a User (PUT):
curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d '{"name": "John Smith", "email": "john.smith@example.com"}'

Delete a User (DELETE):
curl -X DELETE http://localhost:3000/users/1


*/