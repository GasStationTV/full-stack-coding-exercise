import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default (props) => {

	let { sites } = props

	if(props.siteListLoadingError)
		return (
			<div>There was an error loading the Site List.</div>
		)

	if(props.siteListIsLoading)
		return (
			<div>... please wait ...</div>
		)

	if(!sites.length)
		return (
			<div>There are no available sites at this time.</div>
		)

	return (
		<div>

			Site List

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

