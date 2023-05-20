import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import PatientModel from '../models/patient.js';
import { dbOptions } from '../index.js';
import customEnv from 'custom-env';

customEnv.env(true);

chai.use(chaiHttp);

let requester;

const fakeUser = {
  email: 'brian_socks@gmailer.com',
  password: '193948dkflq',
  confirmPassword: '193948dkflq',
  firstName: 'Bowenski',
  lastName: 'Schweijerski',
};

describe('user routes', () => { 
  before(async () => {
    requester = chai.request(app).keepOpen();
    await mongoose.connect(process.env.MONGO_URI, dbOptions)
  })

  afterEach((done) => {
    PatientModel.deleteMany({}, (err) => {
      if (err) done(err);
      else done();
    });
  });

  after(async () => {
    requester.close();
    await mongoose.connection.close();
  });

  // test user signup
  describe('POST api/v1/auth/user/signup', async () => {
    it('signs up user', async () => {
      const res = await requester.post('/api/v1/auth/user/signup').send(fakeUser);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an.object;
      expect(res.body).to.have.property('message');
    })
  })

  // test user sign in
  describe('POST api/v1/auth/user/login', () => { second })
})