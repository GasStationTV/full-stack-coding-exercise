import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SiteList extends Component {

	render() {

		const siteIds = [12, 23, 232, 501];

		return (
			<div>
				Here is the site list.

				<ul>
				{
					siteIds.map(id => (
						<li key={id}>
							<Link to={`/sites/${id}`}>Site ID {id}</Link>
						</li>
					))
				}
				</ul>

			</div>
		);
	}
}