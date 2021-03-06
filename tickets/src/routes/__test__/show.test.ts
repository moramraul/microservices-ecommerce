const request = require('supertest');
import { isExpressionStatement } from 'typescript';
import {app} from '../../app';
import {Ticket} from '../../models/tickets'
import mongoose from 'mongoose';

it('returns 404 ticket not found', async ()=>{
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app) 
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404)
});

it('returns the ticket if ir is found', async ()=>{
   const title = "Concert";
   const price = 20
   
  const response =  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title,
        price
    })
    .expect(201);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
    
    
    


})