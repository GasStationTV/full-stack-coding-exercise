export const TOGGLE_OPEN_FLAG="TOGGLE_OPEN_FLAG"
export function toggleOpenFlag(siteKey){
	return {
		type:TOGGLE_OPEN_FLAG,
		siteKey:siteKey
	}
}

export const OPEN_FLAG_MODAL="OPEN_FLAG_MODAL";
export function openModal(siteKey,mode,flagIndex){
  return {
		type:OPEN_FLAG_MODAL,
		siteKey:siteKey,
    mode:mode,
    flagIndex:flagIndex
	}
}

export const CLOSE_MODAL="CLOSE_MODAL";
export function cancelModal(siteKey,mode){
  return {
		type:CLOSE_MODAL,
		siteKey:siteKey,
    mode:mode
	}
}

export const FORM_CHANGE="FORM_CHANGE";
export function handleChange(siteKey,name,value){
  return {
		type:FORM_CHANGE,
		siteKey:siteKey,
    name:name,
    value:value
	}
}

export const FORM_SAVE="FORM_SAVE";
export function saveModal(siteKey,mode){
  return {
		type:FORM_SAVE,
		siteKey:siteKey,
    mode:mode
	}
}

export const REMOVE_ALERT="REMOVE_ALERT";
export function removeAlertFunc(siteKey,flagIndex){
  return {
		type:REMOVE_ALERT,
		siteKey:siteKey,
    flagIndex:flagIndex
	}
}

export const CANCEL_REMOVE="CANCEL_REMOVE";
export function handleAlertDismiss(siteKey){
  return {
		type:CANCEL_REMOVE,
		siteKey:siteKey
	}
}

export const CONFIRM_REMOVE="CONFIRM_REMOVE";
export function removeConfirm(siteKey){
  return {
		type:CONFIRM_REMOVE,
		siteKey:siteKey
	}
}
