// userService.js
const axios = require('axios');

async function getUser(userId) {
  const response = await axios.get(`https://api.example.com/users/${userId}`);
  return response.data;
}

module.exports = { getUser };
