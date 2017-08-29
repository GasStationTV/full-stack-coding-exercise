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

		this.setState({errorMessage: ""});

		alert("submit form." + JSON.stringify(this.state));

		this.setState({errorMessage: "New Error"});
	}

	handleCancel(event) {
		this.props.onClose();
	}

	handleFlagTypeChange(event) {
		this.setState({flagType: event.target.value});
	}

	handleStartDateChange(event) {
		this.setState({startDate: event.target.value});
	}

	handleEndDateChange(event) {
		this.setState({endDate: event.target.value});
	}

	componentDidMount() {

	}

	render() {

		let listMenuOptions = possibleFlagValues.map((flagType, index) => 
				<option key={index} value="{flagType}">{flagType}</option>
			)

		if(this.props.isAddForm)
			listMenuOptions = [].concat(<option key='defaultKey' value="">Choose One</option>, listMenuOptions);

		const createOrUpdateText = this.props.isAddForm ? "Create New Flag" : "Update Flag"

		let errorMessageBlock = "";

		if(this.state.errorMessage)
			errorMessageBlock = <div>{this.state.errorMessage}</div>


		return (
			<form onSubmit={this.handleFormSubmit}>

				{errorMessageBlock}
				
				<label>
					Flag Type:
					<select onChange={this.handleFlagTypeChange}>
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

				<input type="submit" value={createOrUpdateText} />
				<button type="button" onClick={this.handleCancel} >Cancel</button>
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
