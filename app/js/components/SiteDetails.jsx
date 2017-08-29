import React, { Component } from 'react';

export default (props) => {

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

	return (
		<div>
			<h1>Site ID #{props.siteId}, Site Name: {props.siteName}</h1>
			<div>Total Flags {props.siteFlags.length}</div>
		</div>
	)
}
