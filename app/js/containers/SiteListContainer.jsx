import { connect } from 'react-redux'
import SiteList from '../components/SiteList'
import React, { Component } from 'react';
import { fetchSitesList } from '../actions/thunks'
import { unselectActiveSite } from '../actions/actionObjects'
import { getSitesListIsLoading, getSitesListIsLoadingError, getSitesArr } from '../selectors'
import PropTypes from 'prop-types'


class SiteListContainer extends Component {

	componentDidMount() {

		const { dispatch, sites, sitesListIsLoading } = this.props

		dispatch(unselectActiveSite());

		if(sitesListIsLoading){
			console.log("The Site List is already loading, no need to load it again.");
			return;
		}

		if(!sites.length)
			dispatch(fetchSitesList())
	}

	render() {

		const dumbChildProps = { 
							"sitesListLoadingError":this.props.sitesListLoadingError, 
							"sitesListIsLoading":this.props.sitesListIsLoading,
							"sites":this.props.sites
						}

		return <SiteList { ...dumbChildProps } />
	}
}

// The shape of the array will be validated within SiteList, the props are simply forwarded.
SiteListContainer.propTypes = {
	sites: PropTypes.array.isRequired,
	sitesListIsLoading: PropTypes.bool.isRequired,
	sitesListLoadingError: PropTypes.bool.isRequired
}

export default connect(state => (
	{
		sites: getSitesArr(state), 
		sitesListIsLoading: getSitesListIsLoading(state), 
		sitesListLoadingError: getSitesListIsLoadingError(state)   
	}
	))(SiteListContainer)