'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

let publishers = [
  {
    "id": "1",
    "publisher": "John Wiley & Sons",
    "country": "United States",
    "founded": 1807,
    "genere": "Academic",
    "books": [
      {
        "book_id": 1,
        "title": "Operating System Concepts"
      },
      {
        "book_id": 2,
        "title": "Database System Concepts"
      }
    ]
  },
  {
    "id": "2",
    "publisher": "Pearson Education",
    "country": "United Kingdom",
    "founded": 1844,
    "genere": "Education",
    "books": [
      {
        "book_id": 3,
        "title": "Computer Networks"
      },
      {
        "book_id": 4,
        "title": "Modern Operating Systems"
      }
    ]
  }
];

const app = express.Router();

app.get('/', (req, res) => {
  res.json(publishers);
})

app.get('/:id', (req, res) => {
  let publisher = publishers.find(i => i.id == req.params.id);
  if (publisher == undefined)
    res.status(404).send('Publisher not found');
  else
    res.json(publisher);
})

app.post('/:id', (req, res) => {
  let index = publishers.findIndex(i => i.id == req.params.id);
  if (index != -1)
    res.status(404).send('Publisher already exits');
  else {
    publishers.push(body);
    savePublishers();
  }
})

app.put('/', (req, res) => {
  let index = publishers.findIndex(i => i.id == req.params.id);
  if (index == -1)
    res.status(404).send('Publisher not found');
  else {
    publishers[index] = body;
    savePublishers();
  }
})

app.delete('/:id', (req, res) => {
  let index = publishers.findIndex(i => i.id == req.params.id);
  if (index == -1)
    return resolve();
  else {
    publishers = publishers.filter(i => i.id != req.params.id);
    savePublishers();
  }
})

exp.use(bodyParser.json());
exp.use('/.netlify/functions/publisher', app);

module.exports = exp;
module.exports.handler = serverless(exp);