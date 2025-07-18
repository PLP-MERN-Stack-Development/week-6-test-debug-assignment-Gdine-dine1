import { add } from '../../utils/math';

describe('add utility', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
}); 