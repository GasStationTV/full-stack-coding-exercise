import { Switch, Route } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import SiteList from './SiteList.jsx'
import SiteDetails from './SiteDetails.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

const Application = ({ store }) => (
	<Provider store={store}>
		<BrowserRouter>
		<Switch>
			<Route exact path='/' component={SiteList}/>
			<Route path='/sites/:id' component={SiteDetails}/>
		</Switch>
		</BrowserRouter>
	</Provider>
)

Application.propTypes = {
	store: PropTypes.object.isRequired
}

export default Application
