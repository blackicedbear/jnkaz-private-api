var express = require('express');
const axios = require('axios');
const mongodb = require('mongodb');
var router = express.Router();

router.get('/', async (req, res) => {
  const weatherlog = await loadMongodb();
  res.status(201).send();
});

router.get('/history', async (req, res) => {
  const weatherlog = await loadMongodb();
  res.send(await weatherlog.find({}).toArray());
});

router.get('/:id', async (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://bestweather.p.rapidapi.com/weather/' + req.params.id.replace(/[^a-zA-Z, ]/g, ""),
    params: {unitGroup: 'metric'},
    headers: {
      'x-rapidapi-host': 'bestweather.p.rapidapi.com',
      'x-rapidapi-key': '1e636663a4mshd7940a515bf00b6p1f260djsn39b71921f004'
    }
  };
  axios.request(options).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    res.status(500).send(error);
  });
});

router.get('/history/:id', async (req, res) => {
  const weatherlog = await loadMongodb();
  res.send(await weatherlog.findOne({ 'currentConditions.datetimeEpoch': parseInt(req.params.id) }));
});

async function loadMongodb() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://Janka:JnkaZ@cluster0.intkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }
    );

  return client.db('jnkaz').collection('weatherlog');
}

module.exports = router;
