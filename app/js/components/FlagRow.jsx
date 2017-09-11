import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


function FlagRow (props) {

	return (<div style={{border: "1px solid black", margin: "1em", padding: "1em"}}>
				<div>Flag Type: {props.flagType}</div>
				<div>{props.startDate && "Start Date: "}{props.startDate}</div>
				<div>{props.endDate && "End Date: "}{props.endDate}</div>
				<div>
					<button type='button' onClick={props.onShowEdit}>Edit</button>
					<button type='button' onClick={props.onConfirmDelete}>Delete</button>
				</div>
			</div>)
}

FlagRow.propTypes = {
	onShowEdit: PropTypes.func.isRequired,
	onConfirmDelete: PropTypes.func.isRequired,
	flagType: PropTypes.string.isRequired,
	startDate: PropTypes.string.isRequired,
	endDate: PropTypes.string.isRequired
}

export default FlagRow;
