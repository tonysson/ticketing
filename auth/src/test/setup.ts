import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

// Tell typescript that is there a global variable signin
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>
    }
  }
}

let mongo: any;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

// GLOBAL FUNCTION TO GET AUTHENTICATED
global.signin = async () => {
  const email = 'test@test.com'
  const password  = 'password'

  const response = await request(app)
                           .post('/api/users/signup')
                           .send({email , password})
                           .expect(201)
  const cookie = response.get('Set-Cookie')

  return cookie
}





