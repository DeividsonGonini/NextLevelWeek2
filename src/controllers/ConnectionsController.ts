import { Request, Response } from 'express';
import db from '../database/connection';

export default class ConnectionsController {
    async index(request: Request, response: Response) {
        // coloca um contador (conta todos os registros) e exibe em uma coluna com o nome de total
        const totalConnections = await db('connections').count('* as total');

        //por padrao o knex espera sempre varios retornos, como sabemos que ira retornar apenas 1 linha de registro, colocamos a 1ª posição do array
        const { total } = totalConnections[0];

        return response.json({ total });
    };

    async create(request: Request, response: Response) {
        //capturando o id do usuario pelo body
        const { user_id } = request.body;
        //inserindo o id do usuario na tabela
        await db('connections').insert({
            user_id,
        })

        return response.status(201).send();
    }

}