const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const deviceRouter = require('./controllers/device');
const logRouter = require('./controllers/logs');
const groupRouter = require('./controllers/groups');

mongoose.connect('mongodb://localhost/node-workshop');

app.use(bodyParser.json());

app.use('/api/device', deviceRouter);
app.use('/api/logs', logRouter);
app.use('/api/group', groupRouter);

app.get('/', (req, res) => {
  res.json({
    status: 'Not OK'
  });
});


app.listen(3001);
