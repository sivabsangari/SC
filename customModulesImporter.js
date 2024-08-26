// main.js

// Import the custom module
const math = require('./customModules.js');

// Use the imported functions
const sum = math.add(5, 10);
const difference = math.subtract(10, 4);

console.log('Sum:', sum);           // Output: Sum: 15
console.log('Difference:', difference); // Output: Difference: 6
