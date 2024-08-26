const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.writeFile('example.txt', 'Hello, world!', (err) => {
    if (err) throw err;
    console.log('File has been saved!');
  })
  fs.unlink('example.txt', (err) => {
    if (err) throw err;
    console.log('File was deleted');
  });
  const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
const options = {
    hostname: 'www.example.com',
    port: 80,
    path: '/',
    method: 'GET'
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(data);
    });
  });
  
  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });
  
  req.end();
  const path = require('path');

const fullPath = path.join(__dirname, 'folder', 'file.txt');
console.log(fullPath);
const absolutePath = path.resolve('folder', 'file.txt');
console.log(absolutePath);
const base = path.basename('/foo/bar/baz/asdf/quux.html');
console.log(base); // 'quux.html'
const os = require('os');

console.log(os.platform()); // e.g., 'linux', 'win32'

console.log(os.cpus());
console.log(`Total Memory: ${os.totalmem() / 1024 / 1024} MB`);
console.log(`Free Memory: ${os.freemem() / 1024 / 1024} MB`);

