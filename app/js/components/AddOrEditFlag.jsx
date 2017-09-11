import { connect } from 'react-redux'
import React, { Component } from 'react';
import { possibleFlagValues } from '../lib/constants'
import PropTypes from 'prop-types'


export default class AddOrEditFlag extends Component {

	constructor(props) {
		
		super(props);
		
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.handleFlagTypeChange = this.handleFlagTypeChange.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);

		this.state = {
			flagType: this.props.defaultFlagType,
			startDate: this.props.defaultStartDate,
			endDate: this.props.defaultEndDate,
			errorMessage: ""
		}
	}

	// The AddOrEditFlag should call this method with the Flag Object (to be inserted within the flags array) after it passes validation.
	handleFormSubmit(event) {

		this.setState({errorMessage: ""})

		let newErrorMessage = ""
		let newStartTimestampUnix = 0;
		let newEndTimestampUnix = 0;

		if(!this.state.flagType)
			newErrorMessage = "You must select a Flag Type before submitting the form."

		if(this.state.startDate){

			var possibleStartTimestamp = Date.parse(this.state.startDate)

			if(Number.isNaN(possibleStartTimestamp))
				newErrorMessage = "The start date is invalid."
			else
				newStartTimestampUnix = possibleStartTimestamp
		}
		
		if(this.state.endDate){

			var possibleEndTimestamp = Date.parse(this.state.endDate)

			if(Number.isNaN(possibleEndTimestamp))
				newErrorMessage = "The end date is invalid."
			else
				newEndTimestampUnix = possibleEndTimestamp
		}

		if(newStartTimestampUnix && newEndTimestampUnix){

			if(new Date(newStartTimestampUnix).toLocaleDateString() === new Date(newEndTimestampUnix).toLocaleDateString())
				newErrorMessage = "The start date may not be the same date as the end date."

			if(newStartTimestampUnix > newEndTimestampUnix)
				newErrorMessage = "The start date must be before the end date."
		}

		if(!newStartTimestampUnix && !newEndTimestampUnix)
			newErrorMessage = "Either the start date or the end date must be provided."

		if(newErrorMessage)
			this.setState({errorMessage: newErrorMessage})
		else
			this.props.onSaveFlag({
				flagType: this.state.flagType,
				startDate: this.state.startDate,
				endDate: this.state.endDate
			})

		event.preventDefault()
	}

	handleCancel(event) {
		this.props.onClose()
	}

	handleFlagTypeChange(event) {
		this.setState({flagType: event.target.value})
	}

	handleStartDateChange(event) {
		this.setState({startDate: event.target.value})
	}

	handleEndDateChange(event) {
		this.setState({endDate: event.target.value})
	}

	componentDidMount() {

	}

	render() {

		let listMenuOptions = possibleFlagValues.map((flagType, index) => 
				<option key={index} value={flagType}>{flagType}</option>
			)

		if(this.props.isAddForm)
			listMenuOptions = [].concat(<option key='defaultKey' value="">Choose One</option>, listMenuOptions);

		const createOrUpdateText = this.props.isAddForm ? "Create New Flag" : "Update Flag"

		let errorMessageBlock = "";

		if(this.state.errorMessage)
			errorMessageBlock = <div style={{color:"red"}}>{this.state.errorMessage}</div>


		return (

			<form onSubmit={this.handleFormSubmit}>
				<fieldset>
					<legend>{this.props.isAddForm ? "Add a New Site Flag" : "Edit Site Flag"}</legend>

					{errorMessageBlock}
					
					<label>
						Flag Type:
						<select onChange={this.handleFlagTypeChange} value={this.state.flagType}>
							{listMenuOptions}
						</select>
					</label>

					<label>
						Start Date:
						<input type="text" value={this.state.startDate} onChange={this.handleStartDateChange} />
					</label>

					<label>
						End Date:
						<input type="text" value={this.state.endDate} onChange={this.handleEndDateChange} />
					</label>
					<div>
						<input type="submit" value={createOrUpdateText} />
						<button type="button" onClick={this.handleCancel} >Cancel</button>
					</div>
				</fieldset>
			</form>
		);
	}
}

AddOrEditFlag.propTypes = {
	onSaveFlag: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	defaultFlagType: PropTypes.string.isRequired,
	defaultStartDate: PropTypes.string.isRequired,
	defaultEndDate: PropTypes.string.isRequired,
	isAddForm: PropTypes.bool.isRequired
}
