const db = require('../config/dbConnection');

module.exports = function (app) {

    app.post('/paciente', (req, res, next) => {

        const client = db.getClient();

        client.connect()
        const nome = req.body.nome;
        const sobrenome = req.body.sobrenome;
        const email = req.body.email;
        const datanascimento = req.body.datanascimento;
        const telefone = req.body.telefone;
        const celular = req.body.celular;
        const comentario = req.body.comentario;

        client.query("INSERT INTO pacientes(" +
            "nome, sobrenome, email, data_nasc, telefone, celular, comentario" +
            ") VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [nome, sobrenome, email, datanascimento, telefone, celular, comentario], (err, item) => {

                if (err) {
                    res.json(err)
                    return next(err)

                } else {
                    res.status(200).json("adicionado")
                }
                client.end();
            });
    });

    app.get('/paciente', (req, res, next) => {
        const client = db.getClient();
        client.connect()
        client.query("SELECT * FROM pacientes", (err, result) => {
            if (err) {
                res.json(err)
                return next(err)
            } else {
                res.status(200).json(result.rows)
            }
            client.end();
        });

    });

    app.get('/paciente/:id', (req, res, next) => {
        const client = db.getClient();
        const id = req.params.id;

        client.connect()
        client.query("SELECT * FROM pacientes WHERE id = $1", [id], (err, result) => {
            if (err) {
                res.json(err)
                return next(err)
            } else {
                res.status(200).json(result.rows)
            }
            client.end();
        });

    });

};
