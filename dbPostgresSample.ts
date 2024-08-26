const { Client } = require('pg');

// Create a client instance
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'password',
  database: 'test_db'
});

// Connect to the PostgreSQL database
client.connect(err => {
  if (err) {
    return console.error('Error connecting to PostgreSQL:', err);
  }
  console.log('Connected to PostgreSQL!');
});

// Query example
client.query('SELECT * FROM users', (err, res) => {
  if (err) {
    return console.error('Error executing query:', err);
  }
  console.log('Query results:', res.rows);
});

// Close the connection
client.end();
