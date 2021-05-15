import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Tell typescript that is there a global variable signin
declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
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
global.signin =  () => {
  //build a JWT payload {id , email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };
  //create the JWT
  const token  = jwt.sign(payload , process.env.JWT_KEY!)
  // build the session object : {jwt :MY_JWT}
  const session = {jwt : token}
  // turn that session into json
  const sessionJSON = JSON.stringify(session)
  // take json and encode it as based64
  const base64 = Buffer.from(sessionJSON).toString('base64')
  // return the string that will be our cookie with the encoded data
  return [ `express:sess=${base64}`]
}





