const Professor = require('../models/Professor');
const ProfessorModel = new Professor('Professores');
const to = require('await-to-js').default;

class ProfessorController {
  async buscaPorNome(req, res) {
    const ehNome = /^[a-záâäàéêëèíîïìôóöòûúüùç ]+$/i;
    let { campoNome, profNome } = req.body;
    profNome = profNome.trim();

    /**
     * Deve retornar imediatamente caso a string informada não seja
     * compatível com um nome real.
     * 
     * Exemplo: caso seja vazia, contenha números ou caractéres especiais
     * 
     * OBS: é preciso conferir a regra de negócio para uma melhor filtragem
     */
    if(!ehNome.test(profNome)) {
      return res.status(400).json({
        error_message: 'Nome invalido!' 
      });
    };
    const [err, professor] = await to(ProfessorModel.buscaPorNome(campoNome, profNome));


    if(err) {
      return res.status(500).json({
        error_message: 'Erro não identificado!' 
      });
    }

    if(!professor.length) {
      return res.status(404).json({
        error_message: 'Nenhum professor encontrado!' 
      });
    }

    return res.status(200).json({
      professor
    });
  }

  async buscaTodos(req, res) {
    const [err, professor] = await to(ProfessorModel.buscaTodos());

    if(err) {
      return res.status(500).json({
        error_message: 'Erro não identificado!' 
      });
    }

    if(!professor.length) {
      return res.status(500).json({
        error_message: 'Erro não identificado!' 
      });
    }

    return res.status(200).json({
      professor
    });
  }
}

module.exports = new ProfessorController();