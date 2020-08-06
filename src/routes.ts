import express from 'express';
import ClassesController from './controllers/ClassesController';


//modulo de roteamento do express
const routes = express.Router();

const classesControllers = new ClassesController()

//Rota para criação de aula
routes.post('/classes', classesControllers.create);

//Listando as aulas
routes.get('/classes', classesControllers.index);

export default routes;
