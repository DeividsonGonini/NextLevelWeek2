import Knex from 'knex';

//quais alterações queremos no banco de dados
//em caso de duvidas, olhar a documentação do knex em Migrations API
export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        //criando campo id com autoincrement
        table.increments('id').primary();

        //criando relacionamento com a tabela users
        //criando um campo para ser a chave estrangeira
        table.integer('user_id')
            .notNullable()
            //apontando a chave primaria da outra tabela
            .references('id')
            //apontando qual a tabela de referencia
            .inTable('users')
            //Caso o id seja alterado na tabela de usuario, sera alterado aqui também
            .onUpdate('CASCADE')
            //Caso o usuario (chave primaria) for deletado, todos os dados nessa tabela(chave estrangeira) serão deletados
            .onDelete('CASCADE');

        table.timestamp('create_at')
            //pega o horario atual
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable()
    });
}

//caso ocorra algum problema, desfazer a alteração
export async function down(knex: Knex) {
    return knex.schema.dropTable('connections')
}