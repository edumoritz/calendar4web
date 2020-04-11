const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const events = await connection('eventos').select('*');

        return response.json(events);
    },
    async create(request, response) {
        const { id, titulo, cor_primaria, cor_secundaria, data_inicio, data_fim } = request.body;


        await connection('eventos').insert({
            id,
            titulo, 
            cor_primaria, 
            cor_secundaria, 
            data_inicio, 
            data_fim
        })

        return response.json({ id });
    },
    async getById(request, response) {
        const { id } = request.params;
        // const id = request.headers.authorization;

        const eventos = await connection('eventos')
            .where('id', id)
            .select('*');

            return response.json(eventos);
    },
    async change(request, response) {
        const { id } = request.params;
        const { titulo, cor_primaria, cor_secundaria, data_inicio, data_fim } = request.body;

        await connection('eventos').update({
            titulo, 
            cor_primaria, 
            cor_secundaria, 
            data_inicio, 
            data_fim
        }).where('id', id);

        return response.json(titulo);
    },
    async delete(request, response) {
        const { id } = request.params;
        // const id = request.headers.authorization;
    
        await connection('eventos').where('id', id).delete();

        return response.status(204).send();
    }
}