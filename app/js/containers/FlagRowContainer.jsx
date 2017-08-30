import { connect } from 'react-redux'
import SiteList from '../components/SiteList'
import React, { Component } from 'react';
import { saveSiteData } from '../actions/thunks'
import { editFlag, editFlagCancel, confirmDeleteShow, confirmDeleteHide } from '../actions/actionObjects'
import AddOrEditFlag from '../components/AddOrEditFlag'
import ModalConfirm from '../components/ModalConfirm'
import FlagRow from '../components/FlagRow'
import PropTypes from 'prop-types'

import {getShowAddFlagFormForSelectedSite, 
		getSelectedSiteId, 
		getSelectedSiteObj, 
		getFlagIndexBeingEditedForSelectedSite, 
		getFlagIndexWithDeleteModalForSelectedSite 
		} from '../selectors'


class FlagRowContainer extends Component {

	constructor(props) {
		
		super(props);
		
		this.handleUpdateFlag        = this.handleUpdateFlag.bind(this);
		this.handleCancelEdit        = this.handleCancelEdit.bind(this);
		this.handleShowEdit          = this.handleShowEdit.bind(this);
		this.handleConfirmDeleteShow = this.handleConfirmDeleteShow.bind(this);
		this.handleConfirmDeleteHide = this.handleConfirmDeleteHide.bind(this);
		this.handleDeleteFlagEntry   = this.handleDeleteFlagEntry.bind(this);

		if(this.props.flagIndex >= this.props.siteObj.flags.length)
			throw new Error("Error in FlagRowContainer constructor. The Flag Index is out of bounds.");
	}

	handleUpdateFlag(flagObj) {

		let existingFlagsArr = this.props.siteObj.flags.concat();

		existingFlagsArr[this.props.flagIndex] = flagObj;

		const updatedSiteObj = Object.assign({}, this.props.siteObj, { flags: existingFlagsArr })

		// Get the existing Site Object and add just push the new Flag object onto its array.
		// The REST call must update the entire SiteObj and everything in it.
		this.props.dispatch(saveSiteData(this.props.siteId, updatedSiteObj))
	}

	handleDeleteFlagEntry() {

		if(this.props.flagIndexWithDeleteModal < 0)
			throw new Error("A callback for a delete confirmation occured without a valid flagIndexWithDeleteModal prop.");

		// Make a copy of the array before deleting the entry.
		let existingFlagsArr = this.props.siteObj.flags.concat();

		existingFlagsArr.splice(this.props.flagIndexWithDeleteModal, 1)

		const updatedSiteObj = Object.assign({}, this.props.siteObj, { flags: existingFlagsArr })

		this.props.dispatch(saveSiteData(this.props.siteId, updatedSiteObj))
	}

	handleCancelEdit() {
		this.props.dispatch(editFlagCancel(this.props.siteId, this.props.flagIndex))
	}

	handleShowEdit() {
		this.props.dispatch(editFlag(this.props.siteId, this.props.flagIndex))
	}

	handleConfirmDeleteShow() {
		this.props.dispatch(confirmDeleteShow(this.props.siteId, this.props.flagIndex))
	}

	handleConfirmDeleteHide() {
		this.props.dispatch(confirmDeleteHide(this.props.siteId, this.props.flagIndex))
	}

	render() {

		const currentFlagObj = this.props.siteObj.flags[this.props.flagIndex]

		let deleteModalComponent

		if(this.props.flagIndexWithDeleteModal === this.props.flagIndex)
			deleteModalComponent = (
									<ModalConfirm 
										message="Are you sure that you want to remove this Flag?" 
										onCancel={this.handleConfirmDeleteHide} 
										onConfirm={this.handleDeleteFlagEntry} />)

		const flagRowComponent = (
								<div>
									<FlagRow 
										onShowEdit={this.handleShowEdit} 
										onConfirmDelete={this.handleConfirmDeleteShow} 
										flagType={currentFlagObj.flagType} 
										startDate={currentFlagObj.startDate} 
										endDate={currentFlagObj.endDate} />
									{deleteModalComponent}
								</div>
									)

		// If these two match then it means that the given FlagRow is being edited.
		if(this.props.flagIndexBeingEdited === this.props.flagIndex){

			// Re-use the same component for Adding too.
			return (
					<AddOrEditFlag 
						isAddForm={false} 
						onSaveFlag={this.handleUpdateFlag} 
						onClose={this.handleCancelEdit} 
						defaultFlagType={currentFlagObj.flagType} 
						defaultStartDate={currentFlagObj.startDate} 
						defaultEndDate={currentFlagObj.endDate} />
					)
		}
		else{
			return flagRowComponent
		}
	}
}

FlagRowContainer.propTypes = {
	siteId: PropTypes.string.isRequired,
	siteObj: PropTypes.object.isRequired,
	flagIndex: PropTypes.number.isRequired,
	flagIndexBeingEdited: PropTypes.number.isRequired,
	flagIndexWithDeleteModal: PropTypes.number.isRequired
}

export default connect(state => (
	{
		siteId: getSelectedSiteId(state), 
		siteObj: getSelectedSiteObj(state),
		flagIndexBeingEdited: getFlagIndexBeingEditedForSelectedSite(state),
		flagIndexWithDeleteModal: getFlagIndexWithDeleteModalForSelectedSite(state)
	}
	))(FlagRowContainer)