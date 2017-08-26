import { Switch, Route } from 'react-router-dom'
import React from 'react'
import SiteList from './SiteList.jsx'
import SiteDetails from './SiteDetails.jsx'

export default () => (
  <div>
    <h2>GSTV</h2>
    <Switch>
      <Route exact path='/' component={SiteList}/>
      <Route path='/sites/:id' component={SiteDetails}/>
    </Switch>
  </div>
)
