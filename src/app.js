const express = require('express');

class AppController {

  constructor() {
    this.express = express();
    this.middlwares();
    this.routes();
  }

  middlwares() {
    this.express.use(express.json());
    this.express.use((req, res, next) => {
      //Headers usados para resolver problema de CORS em ambiente local
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

      next();
    })
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new AppController().express;

/**
 * Não há definição de porta aqui pois este arquivo será usado na hora
 * dos testes, quando não há necessidade de se abrir um servidors
 */