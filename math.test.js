// math.test.js
const math = require('./math');

describe('Math Operations', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(math.add(1, 2)).toBe(3);
  });

  test('subtracts 5 - 3 to equal 2', () => {
    expect(math.subtract(5, 3)).toBe(2);
  });

  test('multiplies 2 * 3 to equal 6', () => {
    expect(math.multiply(2, 3)).toBe(6);
  });

  test('divides 6 / 2 to equal 3', () => {
    expect(math.divide(6, 2)).toBe(3);
  });

  test('divides by zero should throw error', () => {
    expect(() => math.divide(6, 0)).toThrow('Cannot divide by zero');
  });
});
