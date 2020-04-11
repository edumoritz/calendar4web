const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const patients = await connection('pacientes').select('*');           

        return response.json(patients);
    },
    async create(request, response) {
        const { nome, sobrenome, email, data_nasc, telefone, celular, comentario } = request.body;
        const id = generateUniqueId(); 

        await connection('pacientes').insert({
            id,
            nome,
            sobrenome, 
            email, 
            data_nasc, 
            telefone, 
            celular, 
            comentario
        });
        return response.json({ id });
    },
    async getById(request, response) {
        const { id } = request.params;
        // const id = request.headers.authorization;

        const pacientes = await connection('pacientes')
            .where('id', id)
            .select('*');

            return response.json(pacientes);
    },
    async change(request, response) {
        const { id } = request.params;
        const { nome, sobrenome, email, data_nasc, telefone, celular, comentario } = request.body;

        await connection('pacientes').update({
            nome,
            sobrenome, 
            email, 
            data_nasc, 
            telefone, 
            celular, 
            comentario
        }).where('id', id);

        return response.json(id);
    },
    async delete(request, response) {
        const { id } = request.params;
        // const id = request.headers.authorization;

        await connection('pacientes').where('id', id).delete();

        return response.status(204).send();
    }
}