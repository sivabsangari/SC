// Create a Buffer from a string
const buf = Buffer.from('Hello, World!', 'utf-8');

// Access individual bytes
console.log(buf[0]); // Output: 72 (ASCII value for 'H')

// Convert Buffer back to string
console.log(buf.toString('utf-8')); // Output: Hello, World!

// Create an empty buffer of size 10
const emptyBuffer = Buffer.alloc(10);
console.log(emptyBuffer); // Output: <Buffer 00 00 00 00 00 00 00 00 00 00>
