const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Secret key for JWT signing and verification
const JWT_SECRET = 'your_jwt_secret';

// In-memory store for usersRegistered
const usersRegistered = [
  { id: 1, username: 'admin', password: '$2a$10$8zT3v7lDEH3sZXI0OeKGu.u2DUNsPe0DN//Z7GZlnJXbmy1h4/oL2', roles: ['admin'] }, // password: 'adminpass'
  { id: 2, username: 'user', password: '$2a$10$8bNkc3ViVmtk5iRYBtyzvOGMk/cN/Vx2uyXqgzmS8h76x/zFQlNna', roles: ['user'] }   // password: 'userpass'
];

// Middleware to verify JWT and extract user
function authenticateTokenData(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Middleware to check for specific roles
function authorizeRoleData(role) {
  return (req, res, next) => {
    if (!req.user.roles.includes(role)) return res.sendStatus(403);
    next();
  };
}

// Route to register new usersRegistered
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  // Create new user and add to the store
  const newUser = {
    id: usersRegistered.length + 1,
    username,
    password: hashedPassword,
    roles: ['user'] // default role
  };
  
  usersRegistered.push(newUser);
  res.status(201).json({ message: 'User registered' });
});

// Route to log in and get a JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = usersRegistered.find(u => u.username === username);

  if (user == null) return res.status(400).json({ message: 'Cannot find user' });
  
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(403).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Route to get user profile (accessible to authenticated usersRegistered)
app.get('/profile', authenticateTokenData, (req, res) => {
  const user = usersRegistered.find(u => u.id === req.user.id);
  if (user) {
    res.json({ id: user.id, username: user.username, roles: user.roles });
  } else {
    res.sendStatus(404);
  }
});

// Route to access admin resource (accessible to admin role)
app.get('/admin', authenticateTokenData, authorizeRoleData('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin area' });
});

// Route to access user resource (accessible to user role)
app.get('/user', authenticateTokenData, authorizeRoleData('user'), (req, res) => {
  res.json({ message: 'Welcome to the user area' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
/*

http://localhost:3000/register
{
  "username": "testuser",
  "password": "testpassword"
}
Response: {"message": "User registered"}

http://localhost:3000/login
{
  "username": "testuser",
  "password": "testpassword"
}
Response: {"token": "JWT_TOKEN"}

http://localhost:3000/profile
Headers:
Authorization : Bearer JWT_TOKEN
Response: User profile information

http://localhost:3000/admin
Authorization : Bearer JWT_TOKEN
Response: {"message": "Welcome to the admin area"}

http://localhost:3000/user
Authorization : Bearer JWT_TOKEN
 Response: {"message": "Welcome to the user area"}np

*/