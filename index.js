const express = require('express')
const winston = require('winston')
const app = express()


require('./startup/routes')(app); //working
require('./startup/db.js')();// working
require('./startup/config.js')(); //working
require('./startup/prod.js')(app); //working


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  winston.info(`${port}chi portni eshitishni boshladim...`);
});


module.exports = server;