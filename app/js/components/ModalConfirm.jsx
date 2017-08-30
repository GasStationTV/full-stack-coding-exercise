import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


function ModalConfirm (props) {

	const modalWrapperCss = {
		position: "fixed",
		zIndex: 2,
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.4)"
	}

	const modalContent = {
		backgroundColor: "#eee",
		margin: "20% auto",
		padding: "3em",
		border: "2px dashed black",
		width: "70%",
		textAlign: "center",
		borderRadius: "1em"
	}

	return (<div style={modalWrapperCss}>
				<div style={modalContent}>
					<div>{props.message}</div>
					<div style={{marginTop: "1em"}}>
						<button type='button' onClick={props.onConfirm}>Confirm</button>
						<button type='button' onClick={props.onCancel}>Cancel</button>
					</div>
				</div>
			</div>)
}

ModalConfirm.propTypes = {
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	message: PropTypes.string.isRequired
}

export default ModalConfirm;
