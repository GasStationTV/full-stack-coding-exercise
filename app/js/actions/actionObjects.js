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

export function selectSite(siteId) {
	return {
		type: actionTypes.SELECT_SITE,
		payload: { siteId, show:true }
	}
}

export function unselectActiveSite() {
	return {
		type: actionTypes.UNSELECT_ACTIVE_SITE,
		payload: { }
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


