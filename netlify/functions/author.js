'use strict';
const express = require('express');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

let authors = [
  {
    "id": "1",
    "author": "Abraham Silberschatz",
    "nationality": "Israelis / American",
    "birth_year": 1952,
    "fields": "Database Systems, Operating Systems",
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
    "author": "Andrew S. Tanenbaum",
    "nationality": "Dutch / American",
    "birth_year": 1944,
    "fields": "Distributed computing, Operating Systems",
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
  res.json(authors);
})

app.get('/:id', (req, res) => {
  let author = authors.find(i => i.id == req.params.id);
  if (author == undefined)
    res.status(404).send('Author not found');
  else
    res.json(author);
})

app.post('/:id', (req, res) => {
  let index = authors.findIndex(i => i.id == req.params.id);
  if (index != -1)
    res.status(404).send('Author already exits'); 
  else {
    authors.push(body);
  }
})

app.put('/', (req, res) => {
  let index = authors.findIndex(i => i.id == req.params.id);
  if (index == -1)
    res.status(404).send('Author not found');
  else {
    authors[index] = body;
  }
})

app.delete('/:id', (req, res) => {
  let index = authors.findIndex(i => i.id == req.params.id);
  if (index == -1)
    return resolve();
  else {
    authors = authors.filter(i => i.id != req.params.id);
  }
})

exp.use(bodyParser.json());
exp.use('/.netlify/functions/author', app);

module.exports = exp;
module.exports.handler = serverless(exp);