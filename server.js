const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  });
});

// Get all of the junk
app.get('/api/v1/junk', (request, response) => {
  database('junk').select()
    .then(junk => {
      response.status(200).json(junk);
    })
    .catch(error => {
      response.status(500).send({ error });
    });
});

// Get a single junk item
app.get('/api/v1/junk/:name', (request, response) => {
  database('junk').where('name', request.params.name).select()
    .then(junk => {
      if(!junk.length) {
        response.status(404).send({
          error: 'There is no such item in the garage'
        })
      } else {
        response.status(200).json(junk)
      }
    })
    .catch(error => {
      response.status(500).send({ error });
    })
})

// Get counts for cleanliness
app.get('/api/v1/junk/count/:cleanliness', (request, response) => {
  database('junk').where('cleanliness', request.params.cleanliness).select()
  .then(junk => {
    if(!junk.length) {
      response.status(404).send({
        error: 'There are no items with that type of cleanliness'
      })
    } else {
      response.status(200).json(junk.length)
    }
  })
  .catch(error => {
    response.status(500).send({ error })
  })
})

// Post request for adding that junk
app.post('/api/v1/junk', (request, response) => {
  const { name, reason, cleanliness } = request.body;
  const junk = request.body;

  if (!name) {
    response.status(422).send ({
      error: 'You are missing a name'
    })
  } else if (!reason) {
    response.status(422).send ({
      error: 'You are missing a reason'
    })
  } else if (!cleanliness) {
    response.status(422).send ({
      error: 'You are missing a cleanliness rating'
    })
  } else {
  database('junk').insert(junk)
    .then(junk => {
      response.status(201).json({ name: name, reason: reason, cleanliness:cleanliness })
    })
    .catch(error => {
      response.status(500).send({ error });
    });
  }
});

// sort up
app.get('/api/v1/sortup', (request, response) => {
  database('junk').select().orderBy('name', 'asc')
    .then((junk) => {
      response.status(200).json(junk)
    })
    .catch((error) => {
      response.status(500).send({ error })
    })
})

// sort reverse
app.get('/api/v1/sortdown', (request, response) => {
  database('junk').select().orderBy('name', 'desc')
    .then((junk) => {
      response.status(200).json(junk)
    })
    .catch((error) => {
      response.status(500).send({ error })
    })
})

app.listen(app.get('port'), () => {
  console.log(`Garage_bin is running on ${app.get('port')}.`)
});

module.exports = app;
