const db = require('../config/dbConnection');

module.exports = function (app) {

  app.get('/events', (req, res, next) => {
    const client = db.getClient();
    client.connect()
    client.query("SELECT * FROM eventos", (err, result) => {
      if (err) {
        res.json(err)
        return next(err)
      } else {
        res.status(200).json(result.rows)
      }
      client.end();
    });
  });

  app.get('/events/:id', (req, res, next) => {
    const client = db.getClient();
    const id = req.params.id;

    client.connect()
    client.query("SELECT * FROM eventos WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.json(err)
            return next(err)
        } else {
            res.status(200).json(result.rows)
        }
        client.end();
    });

  });

  app.post('/events', (req, res, next) => {

    const client = db.getClient();

    client.connect()
    const titulo = req.body.titulo;
    const cor_primaria = req.body.corPrimaria;
    const cor_secundaria = req.body.corSecundaria;
    const data_inicio = req.body.dataInicio;
    const data_final = req.body.dataFim;
    client.query("INSERT INTO eventos(" +
        "titulo, cor_primaria, cor_secundaria, data_inicio, data_final" +
        ") VALUES ($1, $2, $3, $4, $5)",
        [titulo, cor_primaria, cor_secundaria, data_inicio, data_final], (err, item) => {
            if (err) {
                res.json(err)
                return next(err)

            } else {
                res.status(200).json("adicionado")
            }
            client.end();
        });
  });

  app.delete("/events/:id", (req, res, next) => {

    const client = db.getClient();
    var id = req.params.id;

    client.connect(err => {
      if (err) {
        throw err;
      } else {
        client
          .query("DELETE FROM eventos WHERE id = $1", [id], (err, item) => {
            if (err) {
              res.json(err);
              return next(err);
            } else {
              res.status(200).json("excluido");
            }
          });
      }
    });
  });


}
