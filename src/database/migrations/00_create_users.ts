import Knex from 'knex';

//quais alterações queremos no banco de dados
//em caso de duvidas, olhar a documentação do knex em Migrations API
export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        //criando campo id com autoincrement
        table.increments('id').primary();
        //criando campo que nao aceita nulo
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();

    });
}

//caso ocorra algum problema, desfazer a alteração
export async function down(knex: Knex) {
    return knex.schema.dropTable('users')
}