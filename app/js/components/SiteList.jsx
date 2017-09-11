import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


function SiteList (props) {

	let { sites } = props

	if(props.sitesListLoadingError)
		return (
			<div>There was an error loading the Site List.</div>
		)

	if(props.sitesListIsLoading)
		return (
			<div>... please wait ...</div>
		)

	if(!sites.length)
		return (
			<div>There are no available sites at this time.</div>
		)

	return (
		<div>

			<div>Site List</div>

			<ul>
			{
				sites.map(siteObj => (

					<li key={siteObj._id}>
						<Link to={`/sites/${siteObj._id}`}>{siteObj.name}</Link>
					</li>
				))
			}
			</ul>

		</div>
	)
}

SiteList.propTypes = {

	sitesListLoadingError: PropTypes.bool.isRequired,
	sitesListIsLoading: PropTypes.bool.isRequired,
	sites: PropTypes.array.isRequired,

	sites: PropTypes.arrayOf(function(propValue, key) {

		var validateMsgPrefix = "The SiteList component expects an array for the prop name 'sites'. Each element is an object. The element on key: " + key + " is expects an "

		if(!propValue[key]._id || typeof propValue[key]._id !== "string")
			return new Error(validateMsgPrefix + " '_id' property of type string.");

		if(!propValue[key].name || typeof propValue[key].name !== "string")
			return new Error(validateMsgPrefix + " 'name' property of type string.");
	})
}

export default SiteList;
