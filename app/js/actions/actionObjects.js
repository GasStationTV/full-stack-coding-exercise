import * as actionTypes from './actionTypes.js'


export function confirmDeleteShow(siteId, flagIndex) {
	return {
		type: actionTypes.CONFIRM_DELETE_FLAG,
		payload: { siteId, flagIndex, show:true }
	}
}

export function confirmDeleteHide(siteId, flagIndex) {
	return {
		type: actionTypes.CONFIRM_DELETE_FLAG,
		payload: { siteId, flagIndex, show:false }
	}
}

export function viewSite(siteId) {
	return {
		type: actionTypes.VIEW_SITE,
		payload: { siteId, show:true }
	}
}

export function closeSite(siteId) {
	return {
		type: actionTypes.VIEW_SITE,
		payload: { siteId, show:false }
	}
}

export function editFlag(siteId, flagIndex) {
	return {
		type: actionTypes.EDIT_FLAG,
		payload: { siteId, flagIndex, show:true }
	}
}

export function editFlagCancel(siteId, flagIndex) {
	return {
		type: actionTypes.EDIT_FLAG,
		payload: { siteId, flagIndex, show:false }
	}
}

export function updateFlag(siteId, flagIndex, flagObj) {
	return {
		type: actionTypes.UPDATE_FLAG,
		payload: { siteId, flagIndex, flagObj }
	}
}

export function addFlag(siteId) {
	return {
		type: actionTypes.ADD_FLAG,
		payload: { siteId, show:true }
	}
}

export function addFlagCancel(siteId) {
	return {
		type: actionTypes.ADD_FLAG,
		payload: { siteId, show:false }
	}
}

export function createNewFlag(siteId, flagObj) {
	return {
		type: actionTypes.CREATE_FLAG,
		payload: { siteId, flagObj }
	}
}

