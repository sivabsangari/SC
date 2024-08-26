const fs = require('fs');

// Asynchronous file read using a callback
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

// Callback hell example
fs.readFile('file1.txt', 'utf8', (err, data1) => {
    if (err) throw err;
    fs.readFile('file2.txt', 'utf8', (err, data2) => {
      if (err) throw err;
      fs.readFile('file3.txt', 'utf8', (err, data3) => {
        if (err) throw err;
        console.log(data1, data2, data3);
      });
    });
  });

  const fsp = require('fs').promises; // Using the promise-based API

// Function returning a promise
function readFilePromise(filePath) {
  return fsp.readFile(filePath, 'utf8');
}

// Using the promise
readFilePromise('example.txt')
  .then(data => {
    console.log('File content:', data);
  })
  .catch(err => {
    console.error('Error reading file:', err);
  });
// Chaining promises
readFilePromise('file1.txt')
  .then(data1 => {
    console.log('File 1:', data1);
    return readFilePromise('file2.txt');
  })
  .then(data2 => {
    console.log('File 2:', data2);
    return readFilePromise('file3.txt');
  })
  .then(data3 => {
    console.log('File 3:', data3);
  })
  .catch(err => {
    console.error('Error:', err);
  });

  

// Async function
async function readFiles() {
  try {
    const data1 = await fsp.readFile('file1.txt', 'utf8');
    console.log('File 1:', data1);
    
    const data2 = await fsp.readFile('file2.txt', 'utf8');
    console.log('File 2:', data2);
    
    const data3 = await fsp.readFile('file3.txt', 'utf8');
    console.log('File 3:', data3);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

// Calling the async function
readFiles();
