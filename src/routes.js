const routes = require('express').Router();
const ProfessorController = require('./controllers/ProfessorController');

//Definição de rotas
routes.post('/professores', ProfessorController.buscaPorNome);
routes.get('/professores', ProfessorController.buscaTodos);

module.exports = routes;