const Parse = require('parse/node');
const to = require('await-to-js').default;

//Inicialização do banco com o id da aplicação e a chave da linguagem javascript
Parse.initialize('SU0myMIe1AUitLKar0mum8My8RbQ87lEaRjjKDgh', 'GtvnNXChRLZRYBbWxNy9fM0LPloMfpYICCtMdJIL');
Parse.serverURL = 'https://parseapi.back4app.com/';

class Professor {
  constructor(nomeTabelaProfessor) {
    //O parâmetro nomeTabelaProfessor é atribuído em ProfessorController
    this.nomeTabelaProfessor = nomeTabelaProfessor;
    this.tabelaProfessor = Parse.Object.extend(this.nomeTabelaProfessor);
  }

  async buscaPorNome(campoNome, profNome) {
    const consultaProf = new Parse.Query(this.tabelaProfessor);
    /**
     * O .matches irá retornar todos os objetos que possuam no campo desejado (1º parâmetro)
     * a substring informada no 2º parâmetro independente de sua posição.
     * É preciso fazer uma filtragem para extrair apenas os que iniciem com a substring informada (2º parâmetro)
     */
    const [err, professores] = await to(consultaProf.matches(campoNome, profNome, 'i').find());
    //Caso haja erro, enviar array vazio para o ProfessorController retornar a mensagem de erro desejada
    if(err) return [];

    //Filtragem para retornar apenas os professores que iniciem com a substring informada
    return Promise.all(professores.filter(professor => {
      if(professor.get(campoNome).toLowerCase().startsWith(profNome.toLowerCase())) {
        return professor;
      }
    }));
  }

  async buscaTodos() {
    const consultaProf = new Parse.Query(this.tabelaProfessor);
    return consultaProf.find();
  }
}

module.exports = Professor;