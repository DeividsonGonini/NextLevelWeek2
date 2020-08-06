import Knex from 'knex';

//quais alterações queremos no banco de dados
//em caso de duvidas, olhar a documentação do knex em Migrations API
export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        //criando campo id com autoincrement
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        //criando relacionamento com a tabela users

        //criando um campo para ser a chave estrangeira
        table.integer('class_id')
            .notNullable()
            //apontando a chave primaria da outra tabela
            .references('id')
            //apontando qual a tabela de referencia
            .inTable('classes')
            //Caso o id seja alterado na tabela de usuario, sera alterado aqui também
            .onUpdate('CASCADE')
            //Caso o usuario (chave primaria) for deletado, todos os dados nessa tabela(chave estrangeira) serão deletados
            .onDelete('CASCADE')
    });
}

//caso ocorra algum problema, desfazer a alteração
export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule')
}