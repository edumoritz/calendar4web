const db = require('../config/dbConnection');

module.exports = function (app) {

  app.delete("/deletar/:id", (req, res, next) => {

    const client = db.getClient();
    var id = req.params.id;

    client.connect(err => {
      if (err) {
        throw err;
      } else {
        client
          .query("DELETE FROM pacientes WHERE id = $1", [id], (err, item) => {
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
