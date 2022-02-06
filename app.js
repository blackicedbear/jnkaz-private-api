var restify = require('restify');
var corsMiddleware = require('restify-cors-middleware')
var axios = require('axios');
var mongodb = require('mongodb');

var server = restify.createServer();

const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)
server.pre(restify.pre.sanitizePath());

server.get('/api/searchloc/:id', async (req, res) => {
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
        res.status(500);
    });
});

server.get('/api/coronasmt', async (req, res) => {
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
        res.status(500);
    });
});

server.get('/weather/history', async (req, res) => {
    const weatherlog = await loadWeatherMongodb();
    res.send(await weatherlog.find({}).toArray());
});

server.get('/weather/history/:id', async (req, res) => {
    const weatherlog = await loadWeatherMongodb();
    res.send(await weatherlog.findOne({ _id: new mongodb.ObjectID(req.params.id) }));
});

server.get('/weather/:id', async (req, res) => {
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
      res.status(500);
    });
});

server.get('/videos', async (req, res) => {
    const videos = await loadVideoMongodb();
    res.send(await videos.find({}).toArray());
});

server.get('/videos/:id', async (req, res) => {
    const videos = await loadVideoMongodb();
    res.send(await videos.findOne({ _id: new mongodb.ObjectID(req.params.id) }));
});

server.get('/', function(req, res, next) {
    res.status(201);
});

async function loadWeatherMongodb() {
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://Janka:JnkaZ@cluster0.intkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }
      );
  
    return client.db('jnkaz').collection('weatherlog');
}

async function loadVideoMongodb() {
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://Janka:JnkaZ@cluster0.intkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true }
      );
  
    return client.db('jnkaz').collection('video');
}

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});