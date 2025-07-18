const request = require('supertest');
const app = require('../../src/app');

describe('API integration', () => {
  it('GET /api/hello returns hello message', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Hello, world!' });
  });

  it('GET /api/error returns error', async () => {
    const res = await request(app).get('/api/error');
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error');
  });
}); 