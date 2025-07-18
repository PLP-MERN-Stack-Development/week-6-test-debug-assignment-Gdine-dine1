const { multiply } = require('../../src/utils/math');

describe('multiply utility', () => {
  it('multiplies two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });
}); 