import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './scenes/home';
import FlagForm from './scenes/flagForm';

const Routes = (
  <Router>
    <div id="routes">
      <Route exact path="/" component={Home}/>
      <Route path="/flag/new" component={FlagForm}/>
      <Route path="/flag/update/:id" component={FlagForm}/>
    </div>
  </Router>
);
export default Routes;
