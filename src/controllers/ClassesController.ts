import { Request, Response } from 'express'

//importando a conexao com o banco de dados
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';



//Criando uma interface para criar um tipo de variavel
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    //listar as aulas
    async index(request: Request, response: Response) {
        const filters = request.query;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(filters.time as string);

        console.log(timeInMinutes);

        return response.send();
    }

    //criar as aulas
    async create(request: Request, response: Response) {
        //a resposta vai pelo body (corpo)
        //variavel criada com desestruturação
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        //Trabalhando com Transactions: as transações sao feitas juntas, se uma falhar, desfaz as outras
        const trx = await db.transaction()

        try {
            //gravando no banco de dados na tabela users
            //insertedUserIds - ira retornar os ids dos usuarios cadastrados 
            const insertedUserIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            })

            // como vamos inserir apenas um usuario por ve iremos pegar  o id na posição 0 do array
            //e iremos atribuir ao id do usuario(chave estrangeira) que cadastrou a aula
            const user_id = insertedUserIds[0];


            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
            })

            const class_id = insertedClassesIds[0]

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            });
            await trx('class_schedule').insert(classSchedule);

            //Ira inserir todas as informações no banco de dados
            await trx.commit()

            return response.status(201).send();
        } catch (err) {
            console.log(err);
            //desfaz qualquer alteração que foi feita no banco caso tenha ocorrido
            await trx.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }


    }
}