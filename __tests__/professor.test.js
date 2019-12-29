const request = require('supertest');
const app = require('../src/app');

//Suíte de testes relacionada com as buscas dos professores
describe('Search', () => {
  //Busca de todos os professores do banco de dados
  it('should bring all teachers in the database', async () => {
    try {
      const response = await request(app)
        .get('/professores')
        .send();
  
      expect(response.body['error_message']).toBeUndefined();
    } catch(err) {
      throw(err);
    }
  });

  //Busca dos professores que comecem com a substring informada
  it('should search for teachers by their names', async () => {
    const dadosConsultaProfessor = {
      campoNome: 'nome',
      profNome: 'ANA'
    };

    try {
      const response = await request(app)
        .post('/professores')
        .send(dadosConsultaProfessor);
  
      const professor = response.body.professor;
      professor.forEach(prof => expect(prof.nome).toMatch(/^a/i));
    } catch (err) {
      throw(err);
    }
  });

  //Ao buscar por um professor inexistente, retornar mensagem informando o ocorrido
  it('should give a feedback when a teacher is not found', async () => {
    const dadosConsultaProfessor = {
      campoNome: 'nome',
      profNome: 'zzz'
    };

    try {
      const response = await request(app)
        .post('/professores')
        .send(dadosConsultaProfessor);
  
      expect(response.status).toBe(404);
    } catch(err) {
      throw(err);
    }
  });

  //Não é realizada a busca quando a substring informada é invalida
  it('should not search for invalid name', async () => {
    const dadosConsultaProfessor = {
      campoNome: 'nome',
      profNome: ' @8'
    };

    try {
      const response = await request(app)
        .post('/professores')
        .send(dadosConsultaProfessor);
  
      expect(response.status).toBe(400);
    } catch(err) {
      throw(err);
    }
  });
});