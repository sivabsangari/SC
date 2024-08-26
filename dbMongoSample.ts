const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/test_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema and model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

// Create and save a new user
const newUser = new User({ name: 'John', age: 30 });
newUser.save()
  .then(user => console.log('User saved:', user))
  .catch(err => console.error('Error saving user:', err));

// Find users
User.find()
  .then(users => console.log('All users:', users))
  .catch(err => console.error('Error fetching users:', err));
