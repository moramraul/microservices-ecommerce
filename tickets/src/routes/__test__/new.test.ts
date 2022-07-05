const request = require('supertest');
import {app} from '../../app';
import {Ticket} from '../../models/tickets';
import { natsWrapper } from '../../nats-wrapper';


it('Has a route handler listening to /api/tickets for posts', async () => {
const response = await request(app)
    .post('/api/tickets')
    .send({});
    
expect(response.status).not.toEqual(404)
});

it('can only be acces if the user is sign in', async () => {

    const response = await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401)

    // Alternative accesing the response object
//expect(response.status).toEqual(401)

});

it('Retunr status other than 401 is the user is signed ir', async () => {
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})

    expect(response.status).not.toEqual(401)

});

it('Retunr error for invalid title', async () => {
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: '',
        price: 10
    })
    .expect(400)

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        price: 10
    })
    .expect(400)

   
});

it('Retunr error for invalid price', async () => {

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'Yill',
        price: -10
    })
    .expect(400)

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'Yill',
    })
    .expect(400)

});

it('Creates a ticket with valid inputs', async () => {

    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0);

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'Mili',
        price: 10
    })
    .expect(201);

    tickets = await Ticket.find({})
    expect(tickets.length).toEqual(1);

});

it('publishes an event', async ()=> {
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'Mili',
        price: 10
    })
    .expect(201);

expect(natsWrapper.client.publish).toHaveBeenCalled()


});