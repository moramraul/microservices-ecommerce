const request = require('supertest');
import { app } from "../../app";

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'raul@raul.com',
      password: '12345'
    })
    .expect(201);
});

it('returns a 400  with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'raulcom',
        password: '12345'
      })
      .expect(400);
  });

  it('returns a 400  with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'raul@raul.com',
        password: '12'
      })
      .expect(400);
  });

  it('returns a 400  with no email or password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({})
      .expect(400);
  });

  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({email: 'raul@raul.com',
      password: '12243'})
      .expect(201);
    return request(app)
      .post('/api/users/signup')
      .send({email: 'raul@raul.com',
      password: '12243'})
      .expect(400);
  });

  it('sets a cookie after succesful signup', async()=> {
    const response = await request(app)
      .post('/api/users/signup')
      .send({email: 'raul@raul.com',
      password: '12243'})
      .expect(201);
    
      expect(response.get('Set-Cookie')).toBeDefined();

  })