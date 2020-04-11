
exports.up = function(knex) {
    return knex.schema.createTable('eventos', function(table) {
        table.increments();
        table.string('titulo').notNullable();
        table.string('cor_primaria').notNullable();
        table.string('cor_secundaria').notNullable();
        table.string('data_inicio').notNullable();
        table.string('data_fim').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('eventos');
};