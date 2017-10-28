import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './scenes/home';
import Flag from './scenes/flag';

const Routes = (
  <Router>
    <div id="routes">
      <Route exact path="/" component={Home}/>
      <Route path="/flag/new" component={Flag}/>
      <Route path="/flag/update/:id" component={Flag}/>
    </div>
  </Router>
);
export default Routes;
