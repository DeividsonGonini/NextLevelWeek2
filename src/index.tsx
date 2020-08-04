import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Injeta o codigo do App no elemento root, que vai para o navegador
ReactDOM.render(
  <React.StrictMode>
    {/* App onde fica o HTML que sera injetado no root */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

