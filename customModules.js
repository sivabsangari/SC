// mathOperations.js

// Exporting individual functions
// main.js

const Person = require('./person');

const john = new Person('John', 30);
john.greet(); // Output: Hello, my name is John and I am 30 years old.

function add(a, b) {
    return a + b;
  }
  
  function subtract(a, b) {
    return a - b;
  }
  
  // Export the functions so they can be imported in other files
  module.exports = {
    add,
    subtract,
  };
  