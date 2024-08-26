const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL via Sequelize!'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
