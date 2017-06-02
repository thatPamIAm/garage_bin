process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp);


describe('All the tests', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => {
      return database.seed.run();
    })
    .then(() => {
      done();
    });
  });

  afterEach((done) => {
    database.seed.run()
    .then(() => {
      done();
    });
  });

  describe('Client Routes', () => {
    it('should return homepage with html text', (done) => {
      chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();

      });
    });

    it('should return a 404 for a non existent route', (done) => {
      chai.request(server)
      .get('/sosad')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('API Routes', () => {
    describe('GET /api/v1/junk', (request, response) => {
      it('should return all of the junk', (done) => {
        chai.request(server)
        .get('/api/v1/junk')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          done();
        });
      });

      it('should return a 404 erro for a non-existent junk route', (done) => {
        chai.request(server)
        .get('/api/v1/junkzzz')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
      });
    });

    describe('GET /api/v1/junk/:name', (request, response) => {
      it('should return a single item by name', (done) => {
        chai.request(server)
        .get('/api/v1/junk/testshovel')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          done();
        });
      });

      it('should return a 404 error for a non-existent junk route', (done) => {
        chai.request(server)
        .get('/api/v1/junk/rake')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
      });
    });

    describe('POST /api/v1/junk', (request, response) => {
      it.skip('should post a single item', (done) => {
        chai.request(server)
        .post('/api/v1/junk')
        .send({
          name: 'hose', reason: 'just cus', cleanliness: 'dusty'
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          done();
        });
      });

      it('should not allow a post for a non-existent route', (done) => {
        chai.request(server)
        .post('/api/v1/junkzzz')
        .send({
          name: 'hose', reason: 'just cus', cleanliness: 'dusty'
        })
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
      });
    });

    describe('GET /api/v1/junk/count/:cleanliness', (request, response) => {
      it('should get counts for an item by cleanliness', (done) => {
        chai.request(server)
        .get('/api/v1/junk/count/dusty')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.equal(1);
          done();
        });
      });

      it('should return a status of 404 if there are no such items in the database', (done) => {
        chai.request(server)
        .get('/api/v1/junk/count/sparkling')
        .end((error, response) => {
          response.should.have.status(404);
          done()
        });
      });
    });

    describe('GET /api/v1/sortup', (request, response) => {
      it('should sort the items in alphabetical order', (done) => {
        chai.request(server)
        .get('/api/v1/sortup')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('testshovel');
          response.body[1].name.should.equal('testwheelbarrow');
          done();
        });
      });

      it('should return a status of 404 for a bad route', (done) => {
        chai.request(server)
        .get('/api/v1/sortupzzz')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
      });
    });

    describe('GET /api/v1/sortdown', (request, response) => {
      it('should sort the items reverse alphabetical order', (done) => {
        chai.request(server)
        .get('/api/v1/sortdown')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal('testwheelbarrow');
          response.body[1].name.should.equal('testshovel');
          done();
        });
      });

      it('should return a status of 404 for a bad route', (done) => {
        chai.request(server)
        .get('/api/v1/sortdownzzz')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
      });
    });
  });
});
