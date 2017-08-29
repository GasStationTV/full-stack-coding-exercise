import { connect } from 'react-redux'
import SiteDetails from '../components/SiteDetails'
import React, { Component } from 'react';
import { fetchSiteData } from '../actions/thunks'
import { selectSite } from '../actions/actionObjects'
import { getSelectedSiteId, getSelectedSiteName, getSelectedSiteFlags, getSelectedSiteIsLoading, getSelectedSiteHasError, getSelectedSiteIsLoaded } from '../selectors'


class SiteDetailsContainer extends Component {

	componentDidMount() {
		this.loadRoutine();
	}

	componentDidUpdate() {
		this.loadRoutine();
	}

	loadRoutine() {

		let { dispatch, siteDetailsObj, isLoading, siteId, isLoaded } = this.props

		if(!this.props.match.params.id)
			throw new Error("The 'id' must always be present within the SiteDetailsContainer because it's set by the Router.");

		// The SiteID is set by the Router and it should be saved to the Store whenever a change is detected.
		if(siteId !== this.props.match.params.id){
			console.log("Selecting the Site ID on the State from the router:", this.props.match.params.id);
			dispatch(selectSite(this.props.match.params.id))
			return;
		}

		if(isLoading){
			console.log("The Site Details are still loading, once it's down the state will update and re-render this component.");
			return;
		}

		if(!isLoaded)
			dispatch(fetchSiteData(siteId))	
	}

	render() {

		const dumbChildProps = { 
							"siteId":this.props.siteId, 
							"siteName":this.props.siteName,
							"isLoading":this.props.isLoading,
							"siteFlags":this.props.siteFlags,
							"isLoaded":this.props.isLoaded,
							"hasErrorLoading":this.props.hasErrorLoading
						}

		return <SiteDetails { ...dumbChildProps } />
	}
}

export default connect(state => ( 
	{
		siteId: getSelectedSiteId(state), 
		siteName: getSelectedSiteName(state),
		siteFlags: getSelectedSiteFlags(state),
		isLoading: getSelectedSiteIsLoading(state),
		isLoaded: getSelectedSiteIsLoaded(state),
		hasErrorLoading: getSelectedSiteHasError(state)
	}))(SiteDetailsContainer)