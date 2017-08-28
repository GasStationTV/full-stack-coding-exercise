import { connect } from 'react-redux'
import SiteList from '../components/SiteList'
import React, { Component } from 'react';
import { fetchSitesList } from '../actions/thunks'


class SiteListContainer extends Component {

	componentDidMount() {

		let { dispatch, sites, siteListIsLoading } = this.props

		if(siteListIsLoading){
			console.log("The Site List is already loading, skipping.");
			return;
		}

		if(!sites.length)
			dispatch(fetchSitesList())
	}

	render() {

		return <SiteList {...this.props} />
	}
}

export default connect(state => (
	{
		sites: state.sites, 
		siteListIsLoading: state.siteListIsLoading, 
		siteListLoadingError: state.siteListLoadingError   
	}
	))(SiteListContainer)