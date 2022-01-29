var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var weatherRouter = require('./routes/weather');
var apiRouter = require('./routes/api');

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/weather', weatherRouter);
app.use('/api', apiRouter);
app.use('/', indexRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));