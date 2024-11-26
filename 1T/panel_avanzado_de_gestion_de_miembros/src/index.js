import React from 'react';
import ReactDOM from 'react-dom';
import Tabla from './componentesImportantes/GuildMemberManagement/GuildMemberManagement'; // Importa el archivo tabla.js
import './index.css'; // Opcional, si tienes un archivo CSS para estilos globales
ReactDOM.render(
  <React.StrictMode>
    <Tabla /> 
  </React.StrictMode>,
  document.getElementById('root')
);