//importação do express no projeto
import express from 'express';
import routes from './routes';

//chamando a função express
const app = express();

//Adicionando um recurso para que o express entenda JSON
app.use(express.json());
//importando as rotas
app.use(routes);






//ouve requisição do frontend
//3333 porta que daremos para a aplicação
//localhost:3333/users
app.listen(3333);
