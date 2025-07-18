const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const User = require('../../src/models/User');

describe('Auth API', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Bob', email: 'bob@example.com', password: 'password123' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered');
  });

  it('should login a user and return a token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Bob', email: 'bob@example.com', password: 'password123' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'bob@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should access protected route with valid token', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ name: 'Bob', email: 'bob@example.com', password: 'password123' });
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'bob@example.com', password: 'password123' });
    const token = loginRes.body.token;
    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Hello user/);
  });

  it('should not access protected route without token', async () => {
    const res = await request(app).get('/api/protected');
    expect(res.statusCode).toBe(401);
  });
}); 