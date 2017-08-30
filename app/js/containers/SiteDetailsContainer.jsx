import { connect } from 'react-redux'
import SiteDetails from '../components/SiteDetails'
import React, { Component } from 'react';
import { fetchSiteData } from '../actions/thunks'
import { selectSite } from '../actions/actionObjects'
import PropTypes from 'prop-types'
import {getSelectedSiteId, 
		getSelectedSiteName, 
		getSelectedSiteFlags, 
		getSelectedSiteIsLoading, 
		getSelectedSiteIsSaving, 
		getSelectedSiteHasErrorLoading, 
		getSelectedSiteHasErrorSaving, 
		getSelectedSiteIsLoaded } from '../selectors'


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
							"hasErrorLoading":this.props.hasErrorLoading,
							"hasErrorSaving":this.props.hasErrorSaving,
							"isSaving":this.props.isSaving
						}

		return <SiteDetails { ...dumbChildProps } />
	}
}

SiteDetailsContainer.propTypes = {
	hasErrorLoading: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	siteId: PropTypes.string.isRequired,
	siteName: PropTypes.string.isRequired,
	isLoaded: PropTypes.bool.isRequired,
	siteFlags: PropTypes.array.isRequired,
	hasErrorSaving: PropTypes.bool.isRequired,
	isSaving: PropTypes.bool.isRequired
}

export default connect(state => ( 
	{
		siteId: getSelectedSiteId(state), 
		siteName: getSelectedSiteName(state),
		siteFlags: getSelectedSiteFlags(state),
		isLoading: getSelectedSiteIsLoading(state),
		isSaving: getSelectedSiteIsSaving(state),
		isLoaded: getSelectedSiteIsLoaded(state),
		hasErrorLoading: getSelectedSiteHasErrorLoading(state),
		hasErrorSaving: getSelectedSiteHasErrorSaving(state)
	}))(SiteDetailsContainer)