const fs = require('fs');

// Create a readable stream
const readableStream = fs.createReadStream('largeFile.txt', { encoding: 'utf8' });

// Listen to the 'data' event to read chunks of data
readableStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
});

// Listen to the 'end' event to know when the stream has finished
readableStream.on('end', () => {
  console.log('Finished reading file');
});
