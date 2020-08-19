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
        //criando variavel para utilizarmos a função de filtros
        const filters = request.query;

        //Tipando os atributos
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        //Query para o banco de dados
        const classes = await db('classes')
            //whereExists = verifica se o o professor da aula no dia selecionado 
            .whereExists(function () {
                //seleciona a tabela class_schedule
                this.select('class_schedule.*')
                    .from('class_schedule')
                    //faz a comparação da class (aula)
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    //recebe o parametro week_day e verifica no banco de dados (verifica se o professor da aula no dia passado pesquisado)
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    //verifica se o professor da aula num horario menor ou igual ao pesquisado
                    .whereRaw('`class_schedule`.`from` <= ??', timeInMinutes)
                    //verifica se o horario pesquisado não é maior do que o horario que o professor dá aula
                    .whereRaw('`class_schedule`.`to` > ??', timeInMinutes)
            })
            .where('classes.subject', '=', subject)
            //apontando o relacionamento entre tabelas 
            .join('users', 'classes.user_id', '=', 'users.id')
            //seleciona todos os dados das 2 tabelas (com inner join)
            .select(['classes.*', 'users.*'])

        return response.json(classes);
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