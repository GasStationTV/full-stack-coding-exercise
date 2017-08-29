import { Switch, Route } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import SiteListContainer from '../containers/SiteListContainer'
import SiteDetailsContainer from '../containers/SiteDetailsContainer'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

const Application = ({ store }) => (

	<Provider store={store}>
		<BrowserRouter>
		<Switch>
			<Route exact path='/' component={SiteListContainer}/>
			<Route path='/sites/:id' component={SiteDetailsContainer}/>
		</Switch>
		</BrowserRouter>
	</Provider>
)

Application.propTypes = {
	store: PropTypes.object.isRequired
}

export default Application
