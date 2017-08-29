import { connect } from 'react-redux'
import SiteList from '../components/SiteList'
import React, { Component } from 'react';
import { saveSiteData } from '../actions/thunks'
import { addFlag, addFlagCancel } from '../actions/actionObjects'
import { getShowAddFlagFormForSelectedSite, getSelectedSiteId } from '../selectors'
import AddOrEditFlag from '../components/AddOrEditFlag'
import PropTypes from 'prop-types'


class AddFlagContainer extends Component {

	constructor(props) {
		
		super(props);
		
		this.handleSaveFlag = this.handleSaveFlag.bind(this);
		this.handleCloseAddForm = this.handleCloseAddForm.bind(this);
		this.handleShowAddForm = this.handleShowAddForm.bind(this);
	}

	// The AddOrEditFlag should call this method with the Flag Object (to be inserted within the flags array) after it passes validation.
	handleSaveFlag(flagObj) {

	}

	handleCloseAddForm() {
		this.props.dispatch(addFlagCancel(this.props.siteId))
	}

	handleShowAddForm() {
		this.props.dispatch(addFlag(this.props.siteId))
	}

	componentDidMount() {

	}

	render() {
		
		if(this.props.showAddFlagForm){

			// Re-use the same component for Editing and Adding a Flag.
			return (<AddOrEditFlag 
						isAddForm={true} 
						onSaveFlag={this.handleSaveFlag} 
						onClose={this.handleCloseAddForm} 
						defaultFlagType="" 
						defaultStartDate="" 
						defaultEndDate="" />
					)
		}
		else{
			return <button onClick={this.handleShowAddForm}>Add Flag</button>
		}
	}
}

AddFlagContainer.propTypes = {
	siteId: PropTypes.string.isRequired,
	showAddFlagForm: PropTypes.bool.isRequired
}

export default connect(state => (
	{
		siteId: getSelectedSiteId(state), 
		showAddFlagForm: getShowAddFlagFormForSelectedSite(state)
	}
	))(AddFlagContainer)