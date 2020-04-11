const db = require('../config/dbConnection');

module.exports = function (app) {

  app.put("/alterar/:id", (req, res, next) => {

    const client = db.getClient();
    client.connect()

    const id = req.params.id;
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const datanascimento = req.body.datanascimento;
    const telefone = req.body.telefone;
    const celular = req.body.celular;
    const comentario = req.body.comentario;

    client
      .query("update pacientes set " +
        "nome = $1, sobrenome = $2, email = $3, data_nasc = $4, telefone = $5, celular = $6, comentario = $7 " +
        "where id = $8",
        [nome, sobrenome, email, datanascimento, telefone, celular, comentario, id], (err, item) => {
          if (err) {
            res.json(err);
            return next(err);
          } else {
            res.status(200).json("atualizado");
          }
          client.end();
        });

  });



}
