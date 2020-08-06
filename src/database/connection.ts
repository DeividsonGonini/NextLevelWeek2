import knex from 'knex';
import path from 'path';

//migrations = controlam a versao do banco de dados

const db = knex({
    client: 'sqlite3',
    connection: {
        //dirname = retorna o diretorio que esta o arquivo onde foi executado o dirname;
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    //quando ele nao conseguir identificar um valor padrao ira colocar como nulo 
    useNullAsDefault: true,

});

export default db;