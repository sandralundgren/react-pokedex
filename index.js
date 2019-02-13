const express = require('express');
const path 		= require('path');
const axios   = require('axios');

const { baseUrl } = require('./api/api');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/pokemon/all', (req, res) => {
  axios.get(`${baseUrl}/pokemon/?limit=800`)
    .then(response => res.json(response.data))
    .catch(err => console.log(err));
});

app.get('/api/pokemon/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`${baseUrl}/pokemon/${id}`)
    .then(response => res.json(response.data))
    .catch(err => console.log(err));
});

app.get('/api/pokemon-species/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`${baseUrl}/pokemon-species/${id}`)
    .then(response => res.json(response.data))
    .catch(err => console.log(err));
});

app.get('/api/type/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`${baseUrl}/type/${id}`)
    .then(response => res.json(response.data))
    .catch(err => console.log(err));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
