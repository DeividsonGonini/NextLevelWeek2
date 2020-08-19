import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';


//modulo de roteamento do express
const routes = express.Router();

const classesControllers = new ClassesController()
const connectionsController = new ConnectionsController()



//Rota para criação de aula
routes.post('/classes', classesControllers.create);

//Listando as aulas
routes.get('/classes', classesControllers.index);

//Rotas para Connections
routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;
