import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AddFlagContainer from '../containers/AddFlagContainer'

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

	var headerTag = <h2>Site ID #{props.siteId}, Site Name: {props.siteName}</h2>
	var closeLink = <div><Link to='/'>Close</Link></div>
	var addFlagButton = <div><AddFlagContainer /></div>
	var flagsList = "Flags"

	// var flagsList = this.props.siteFlags.map((flagObj, flagIndex) => 
	// 	<FlagRowContainer flagIndex='{flagIndex}' siteId='{props.siteId}' />
	// )

	if(!props.siteFlags.length){

		return (
			<div>
				{headerTag}
				{closeLink}
				{addFlagButton}
				<div>There are no site flags</div>
			</div>
		)
	}
	else{

		return (
			<div>
				{headerTag}
				{closeLink}
				{addFlagButton}
				<div>Total Flags {props.siteFlags.length}</div>
				<div>{flagsList}</div>
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
	siteFlags: PropTypes.array.isRequired
}

export default SiteDetails