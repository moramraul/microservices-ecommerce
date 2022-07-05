const request = require('supertest');
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
const jwt = require('jsonwebtoken') 

declare global {
    var signin: () => string[];
  }

jest.mock('../nats-wrapper.ts');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
 
  mongo = await MongoMemoryServer.create();
 
  await mongoose.connect(mongo.getUri());
});
 
beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
 
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
 
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
    // Build JWT playload

    const playload = {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: "test@test.com"
    };

    // Create the JWT

    const token = jwt.sign(playload, process.env.JWT_KEY)

    // Build Session object

    const session = {
      jwt: token
    }

    // Turn session into JSOM

    const sessionJSON = JSON.stringify(session)

    // Take JSON encode base54

    const base64 = Buffer.from(sessionJSON).toString('base64')

    // Return string to set cookie

    return [`session=${base64}`];

  };