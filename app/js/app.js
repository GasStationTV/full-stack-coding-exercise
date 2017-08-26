import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>
  ,
  document.getElementById('app')
);
  
