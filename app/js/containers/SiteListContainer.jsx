import { connect } from 'react-redux'
import SiteList from '../components/SiteList'
import React, { Component } from 'react';
import { fetchSitesList } from '../actions/thunks'
import { getSitesListIsLoading, getSitesListIsLoadingError, getSitesArr } from '../selectors'


class SiteListContainer extends Component {

	componentDidMount() {

		const { dispatch, sites, sitesListIsLoading } = this.props

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

export default connect(state => (
	{
		sites: getSitesArr(state), 
		sitesListIsLoading: getSitesListIsLoading(state), 
		sitesListLoadingError: getSitesListIsLoadingError(state)   
	}
	))(SiteListContainer)