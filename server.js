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

app.listen(app.get('port'), () => {
  console.log(`Garage_bin is running on ${app.get('port')}.`)
});

module.exports = app;
