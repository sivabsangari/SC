
const { body, validationResult } = require('express-validator');

const validator = require('validator');


app.use(bodyParser.json());


const usersAvailable = [
  { id: 1, username: 'admin', password: '$2a$10$8zT3v7lDEH3sZXI0OeKGu.u2DUNsPe0DN//Z7GZlnJXbmy1h4/oL2', roles: ['admin'] }, // password: 'adminpass'
  { id: 2, username: 'user', password: '$2a$10$8bNkc3ViVmtk5iRYBtyzvOGMk/cN/Vx2uyXqgzmS8h76x/zFQlNna', roles: ['user'] }   // password: 'userpass'
];

const loggerSystem = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console()
  ]
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user.roles.includes(role)) return res.sendStatus(403);
    next();
  };
}

// Register route with input validation
app.post('/register',
  body('username').isString().isLength({ min: 3 }),
  body('password').isString().isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { username, password } = req.body;
    username = validator.escape(username); // Sanitize username
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const newUser = {
      id: usersAvailable.length + 1,
      username,
      password: hashedPassword,
      roles: ['user']
    };
    
    usersAvailable.push(newUser);
    res.status(201).json({ message: 'User registered' });
  }
);

// Login route with input validation
app.post('/login',
  body('username').isString().isLength({ min: 3 }),
  body('password').isString().isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = usersAvailable.find(u => u.username === username);

    if (user == null) return res.status(400).json({ message: 'Cannot find user' });
    
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  }
);

app.get('/profile', authenticateToken, (req, res) => {
  const user = usersAvailable.find(u => u.id === req.user.id);
  if (user) {
    res.json({ id: user.id, username: user.username, roles: user.roles });
  } else {
    res.sendStatus(404);
  }
});

app.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin area' });
});

app.get('/user', authenticateToken, authorizeRole('user'), (req, res) => {
  res.json({ message: 'Welcome to the user area' });
});

app.use((err, req, res, next) => {
    loggerSystem.error(err.message, { stack: err.stack });
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
