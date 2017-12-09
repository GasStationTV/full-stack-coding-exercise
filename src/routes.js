// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
// import NotFound from './components/NotFound';
import Sites from './pages/sites/SitesContainer';
import Site from './pages/site/SiteContainer';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/sites" component={Sites} />
    <Route path="/site/:id" component={Site} />
    {/* <Route path="*" component={NotFound} /> */}
  </Router>
);

export default Routes;
