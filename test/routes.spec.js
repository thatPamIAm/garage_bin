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
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
    })
  })

  describe('API Routes', () => {

  })
})
