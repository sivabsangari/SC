
const path = require('path');

// Define file paths
const filePath = path.join(__dirname, 'example.txt');

// Content to write into the file
const content = 'Hello, this is some text!';

// --------------------
// Asynchronous Methods
// --------------------

// Write to file asynchronously
fs.writeFile(filePath, content, 'utf8', (err) => {
  if (err) {
    return console.error('Error writing file asynchronously:', err);
  }
  console.log('File written successfully (async).');

  // Read the file asynchronously after writing
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.error('Error reading file asynchronously:', err);
    }
    console.log('File content read asynchronously:', data);
  });
});

// --------------------
// Synchronous Methods
// --------------------

// Write to file synchronously
try {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('File written successfully (sync).');
} catch (err) {
  console.error('Error writing file synchronously:', err);
}

// Read the file synchronously after writing
try {
  const data = fs.readFileSync(filePath, 'utf8');
  console.log('File content read synchronously:', data);
} catch (err) {
  console.error('Error reading file synchronously:', err);
}
