import { connect } from 'react-redux'
import SiteList from '../components/SiteList'
import React, { Component } from 'react';
import { saveSiteData } from '../actions/thunks'
import { addFlag, addFlagCancel } from '../actions/actionObjects'
import { getShowAddFlagFormForSelectedSite, getSelectedSiteId, getSelectedSiteObj } from '../selectors'
import AddOrEditFlag from '../components/AddOrEditFlag'
import PropTypes from 'prop-types'


class AddFlagContainer extends Component {

	constructor(props) {
		
		super(props);
		
		this.handleSaveFlag = this.handleSaveFlag.bind(this);
		this.handleCloseAddForm = this.handleCloseAddForm.bind(this);
		this.handleShowAddForm = this.handleShowAddForm.bind(this);
	}

	// The AddOrEditFlag dummy component should call this method with the Flag Object (to be inserted within the SiteObject's flags array) after it passes validation.
	handleSaveFlag(flagObj) {

		var existingFlagsArr = this.props.siteObj.flags.concat();

		existingFlagsArr.push(flagObj);

		var updatedSiteObj = Object.assign({}, this.props.siteObj, { flags: existingFlagsArr })

		// Get the existing Site Object and add just push the new Flag object onto its array.
		// The REST call must update the entire SiteObj and everything in it.
		this.props.dispatch(saveSiteData(this.props.siteId, updatedSiteObj))
	}

	handleCloseAddForm() {
		this.props.dispatch(addFlagCancel(this.props.siteId))
	}

	handleShowAddForm() {
		this.props.dispatch(addFlag(this.props.siteId))
	}

	render() {

		if(this.props.showAddFlagForm){

			// Re-use the same component for Editing too.
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
		siteObj: getSelectedSiteObj(state), 
		showAddFlagForm: getShowAddFlagFormForSelectedSite(state)
	}
	))(AddFlagContainer)