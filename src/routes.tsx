import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

function Routes() {
    return (
        <BrowserRouter>
            {/* path = é a rota => nesse caso "/" é  pagina inicial  */}
            {/* component = component que sera chamado no path acessado, nesse caso Landing */}
            {/* exact mostra a pagina principal apenas quando o path for EXATAMENTE igual */}
            <Route path="/" exact component={Landing} />
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />
        </BrowserRouter>
    )
}

export default Routes;