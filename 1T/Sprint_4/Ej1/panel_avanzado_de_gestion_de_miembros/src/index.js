import React from 'react';
import ReactDOM from 'react-dom';
import Tabla from './componentesImportantes/Tabla/Tabla'; // Importa el archivo tabla.js
import './index.css'; // Opcional, si tienes un archivo CSS para estilos globales

ReactDOM.render(
  <React.StrictMode>
    <Tabla /> 
  </React.StrictMode>,
  document.getElementById('root')
);