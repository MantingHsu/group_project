
const request = require('supertest');
const app     = require('../app');        // path to Express app
const Registration = require('../models/Registration'); // adjust path

describe('Auth Endpoints', () => {
  it('should register a user and set a session cookie', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ username: 'alice', email: 'a@b.com', password: 'secret' });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.userId).toBeDefined();

    const cookie = res.headers['set-cookie'][0];
    expect(cookie).toMatch(/connect\.sid/);
  });

  it('should reject invalid login', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'nosuch@user.com', password: 'wrong' });

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
