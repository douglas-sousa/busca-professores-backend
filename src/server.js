const app = require('./app');

//Quando o servidor estiver em produção, a variável PORT será atribuída
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor rodando com sucesso');
});