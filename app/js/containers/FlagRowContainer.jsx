import { connect } from 'react-redux'
import SiteList from '../components/SiteList'
import React, { Component } from 'react';
import { saveSiteData } from '../actions/thunks'
import { editFlag, editFlagCancel, confirmDeleteShow, confirmDeleteHide } from '../actions/actionObjects'
import { getShowAddFlagFormForSelectedSite, getSelectedSiteId, getSelectedSiteObj, getFlagIndexBeingEditedForSelectedSite } from '../selectors'
import AddOrEditFlag from '../components/AddOrEditFlag'
import FlagRow from '../components/FlagRow'
import PropTypes from 'prop-types'


class FlagRowContainer extends Component {

	constructor(props) {
		
		super(props);
		
		this.handleUpdateFlag = this.handleUpdateFlag.bind(this);
		this.handleCancelEdit = this.handleCancelEdit.bind(this);
		this.handleShowEdit = this.handleShowEdit.bind(this);
		this.handleConfirmDeleteShow = this.handleConfirmDeleteShow.bind(this);
		this.handleConfirmDeleteHide = this.handleConfirmDeleteHide.bind(this);

		if(this.props.flagIndex >= this.props.siteObj.flags.length)
			throw new Error("Error in FlagRowContainer constructor. The Flag Index is out of bounds.");
	}

	handleUpdateFlag(flagObj) {

		var existingFlagsArr = this.props.siteObj.flags.concat();

		existingFlagsArr[this.props.flagIndex] = flagObj;

		var updatedSiteObj = Object.assign({}, this.props.siteObj, { flags: existingFlagsArr })

		// Get the existing Site Object and add just push the new Flag object onto its array.
		// The REST call must update the entire SiteObj and everything in it.
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

	componentDidMount() {

	}

	render() {

		const currentFlagObj = this.props.siteObj.flags[this.props.flagIndex]

		const flagRowComponent = (
									<FlagRow 
										onShowEdit={this.handleShowEdit} 
										onConfirmDelete={this.handleConfirmDeleteShow} 
										flagType={currentFlagObj.flagType} 
										startDate={currentFlagObj.startDate} 
										endDate={currentFlagObj.endDate} />
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
	flagIndexBeingEdited: PropTypes.number.isRequired
}

export default connect(state => (
	{
		siteId: getSelectedSiteId(state), 
		siteObj: getSelectedSiteObj(state),
		flagIndexBeingEdited: getFlagIndexBeingEditedForSelectedSite(state)
	}
	))(FlagRowContainer)