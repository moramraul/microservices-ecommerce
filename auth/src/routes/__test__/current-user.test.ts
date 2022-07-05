const request = require('supertest');
import { app } from "../../app";
import { currentUser } from '@rmm811tickets/common';

it('response with details about the current user', async () => {
  const cookie = await global.signin()
      
      const response = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual('raul@raul.com')

  });