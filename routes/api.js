var express = require('express');
const axios = require('axios');
var router = express.Router();

router.get('/', async (req, res) => {
  res.status(201).send();
});

router.get('/coronasmt', async (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://coronavirus-smartable.p.rapidapi.com/stats/v1/AT/',
    headers: {
      'x-rapidapi-host': 'coronavirus-smartable.p.rapidapi.com',
      'x-rapidapi-key': '1e636663a4mshd7940a515bf00b6p1f260djsn39b71921f004'
    }
  };
  axios.request(options).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    res.status(500).send(error);
  });
});

router.get('/coronasmt', async (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://coronavirus-smartable.p.rapidapi.com/stats/v1/AT/',
    headers: {
      'x-rapidapi-host': 'coronavirus-smartable.p.rapidapi.com',
      'x-rapidapi-key': '1e636663a4mshd7940a515bf00b6p1f260djsn39b71921f004'
    }
  };
  axios.request(options).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    res.status(500).send(error);
  });
});

router.get('/searchloc/:id', async (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    params: {
      types: 'CITY',
      languageCode: 'de',
      sort: 'name',
      distanceUnit: 'KM',
      namePrefix: req.params.id.replace(/[^a-zA-Z, ]/g, "")
    },
    headers: {
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': '1e636663a4mshd7940a515bf00b6p1f260djsn39b71921f004'
    }
  };
  axios.request(options).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    res.status(500).send(error);
  });
});

module.exports = router;
