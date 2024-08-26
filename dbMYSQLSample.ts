
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test_db'
});

// Connect to the database
connection.connect(err => {
  if (err) {
    return console.error('Error connecting to MySQL:', err);
  }
  console.log('Connected to MySQL!');
});

// Query example
connection.query('SELECT * FROM users', (err, results) => {
  if (err) {
    return console.error('Error executing query:', err);
  }
  console.log('Query results:', results);
});

// Close the connection
connection.end();
