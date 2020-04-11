
exports.up = function(knex) {
  return knex.schema.createTable('pacientes', function(table) {
      table.string('id').primary();
      table.string('nome').notNullable();
      table.string('sobrenome').notNullable();
      table.string('email').notNullable();
      table.string('data_nasc').notNullable();
      table.string('telefone').notNullable();
      table.string('celular').notNullable();
      table.string('comentario').notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('pacientes');
};

