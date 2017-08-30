import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AddFlagContainer from '../containers/AddFlagContainer'
import FlagRowContainer from '../containers/FlagRowContainer'

function SiteDetails (props) {

	const siteObj = {}

	if(props.hasErrorLoading)
		return (
			<div>There was an error loading the Site Details.</div>
		)

	if(props.isLoading)
		return (
			<div>... please wait ...</div>
		)

	if(!props.isLoaded)
		return (
			<div>The Site Details haven't been loaded from the server yet.</div>
		)

	// Assign the original index to an object property before filtering the list.
	// The array position is significant, it will be used as an identifier to a Container component below.
	let filteredSiteFlagsByEndDate = props.siteFlags.map((flagObj, siteFlagIndex) => 
		Object.assign({}, flagObj, {siteFlagIndex})
	)

	// Filter out any flags that have an EndDate, and which occurs in the past.
	filteredSiteFlagsByEndDate = filteredSiteFlagsByEndDate.filter(flagObj =>
		(flagObj.endDate && Date.parse(flagObj.endDate) < Date.now()) ? false : true
	)

	const flagsTableRows = filteredSiteFlagsByEndDate.map((flagObj, flagIndex) => 
		<FlagRowContainer key={flagObj.siteFlagIndex} flagIndex={flagObj.siteFlagIndex} />
	)

	const isSavingTag = <div>... saving ...</div>
	const hasSavingErrorTag = <div style={{color:"red"}}>There was an error saving to the server.</div>

	const commonHeader = (
				<div>
					<h2>{props.siteName}</h2>
					<div><Link to='/'>Close Site Details</Link></div>
					<div style={{marginTop:"1em"}}><AddFlagContainer /></div>
					{ props.isSaving && isSavingTag }
					{ props.hasErrorSaving && hasSavingErrorTag }
				</div>
		)

	if(!props.siteFlags.length){

		return (
			<div>
				{commonHeader}
				<div style={{fontWeight:"bold", marginTop:"1em"}}>There are no site flags.</div>
			</div>
		)
	}
	else{

		return (
			<div>
				{commonHeader}
				<div style={{border: "1px dotted gray", marginTop:"1em", marginBottom:"1em", padding:"0.4em"}}>
					Active Flags: {filteredSiteFlagsByEndDate.length} - Expired: {props.siteFlags.length - filteredSiteFlagsByEndDate.length}
				</div>
				{flagsTableRows}
			</div>
		)
	}
}

SiteDetails.propTypes = {
	hasErrorLoading: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	siteId: PropTypes.string.isRequired,
	siteName: PropTypes.string.isRequired,
	isLoaded: PropTypes.bool.isRequired,
	siteFlags: PropTypes.array.isRequired,
	hasErrorSaving: PropTypes.bool.isRequired,
	isSaving: PropTypes.bool.isRequired
}

export default SiteDetails