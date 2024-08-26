
const winston = require('winston');



app.use(bodyParser.json());



const usersList = [
  { id: 1, username: 'admin', password: '$2a$10$8zT3v7lDEH3sZXI0OeKGu.u2DUNsPe0DN//Z7GZlnJXbmy1h4/oL2', roles: ['admin'] }, // password: 'adminpass'
  { id: 2, username: 'user', password: '$2a$10$8bNkc3ViVmtk5iRYBtyzvOGMk/cN/Vx2uyXqgzmS8h76x/zFQlNna', roles: ['user'] }   // password: 'userpass'
];

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console()
  ]
});

function authenticateTokenInfo(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authorizeRoleInfo(role) {
  return (req, res, next) => {
    if (!req.user.roles.includes(role)) return res.sendStatus(403);
    next();
  };
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  const newUser = {
    id: usersList.length + 1,
    username,
    password: hashedPassword,
    roles: ['user']
  };
  
  usersList.push(newUser);
  res.status(201).json({ message: 'User registered' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = usersList.find(u => u.username === username);

  if (user == null) return res.status(400).json({ message: 'Cannot find user' });
  
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(403).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/profile', authenticateTokenInfo, (req, res) => {
  const user = usersList.find(u => u.id === req.user.id);
  if (user) {
    res.json({ id: user.id, username: user.username, roles: user.roles });
  } else {
    res.sendStatus(404);
  }
});

app.get('/admin', authenticateTokenInfo, authorizeRoleInfo('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin area' });
});

app.get('/user', authenticateTokenInfo, authorizeRoleInfo('user'), (req, res) => {
  res.json({ message: 'Welcome to the user area' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
