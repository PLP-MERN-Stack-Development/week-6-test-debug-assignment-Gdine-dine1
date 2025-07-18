const logger = require('../../src/middleware/logger');

describe('logger middleware', () => {
  it('logs the request method and url and calls next', () => {
    const req = { method: 'GET', url: '/test' };
    const res = {};
    const next = jest.fn();
    console.log = jest.fn();

    logger(req, res, next);

    expect(console.log).toHaveBeenCalledWith('GET /test');
    expect(next).toHaveBeenCalled();
  });
}); 