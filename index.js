

const express = require('express');
const app = express();

const { config } = require('./config/index');
const playersApi = require('./routes/players.js');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser
app.use(express.json());

//rutas 7 routes
playersApi(app);

//se captura el error 404 / Catch 404
app.use(notFoundHandler);


// manejadores de errores / Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
