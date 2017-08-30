import {getAllSites} from '../api/sitesApi';
import {createNewFlag,updateExistingFlag,removeExistingFlag} from '../api/flagsApi';

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

export const LOAD_SITES_SUCESS="LOAD_SITES_SUCESS";
export function loadSitesSuccess(sites){
	let enrichedSites={}
	sites.map((site,index)=>{
		enrichedSites[site._id]=site;
	})
  return {
		type:LOAD_SITES_SUCESS,
		sites:enrichedSites
	}
}

export const LOAD_SITES_ERROR="LOAD_SITES_ERROR";
export function loadSitesError(error){
  return {
		type:LOAD_SITES_ERROR,
		error:error
	}
}

export function loadSitesFromAPI(){
	return function(dispatch) {
    return getAllSites().then(response => {
			if(response.stack){
				dispatch(loadSitesError(response.message));
			}else{
				dispatch(loadSitesSuccess(response));
			}
    }).catch(error => {
      dispatch(loadSitesError(error));
    });
  };
}

export const FLAG_SAVE_ERROR="FLAG_SAVE_ERROR";
export function flagSaveError(siteKey,error){
  return {
		type:FLAG_SAVE_ERROR,
		error:error,
		siteKey:siteKey
	}
}

export const FLAG_SAVE_SUCESS="FLAG_SAVE_SUCESS";
export function flagSaveSucess(siteKey,newFlag){
  return {
		type:FLAG_SAVE_SUCESS,
		newFlag:newFlag,
		siteKey:siteKey
	}
}

export function addFlagAPI(siteKey,sites){
	const insertFlag=sites[siteKey].flags[sites[siteKey].editFlagIndex]
	return function(dispatch) {
    return createNewFlag(siteKey,insertFlag.startDate,insertFlag.endDate,insertFlag.flagType).then(response => {
			if(response.stack){
				dispatch(flagSaveError(siteKey,response.message));
			}else{
				dispatch(flagSaveSucess(siteKey,response));
			}
    }).catch(error => {
      dispatch(flagSaveError(siteKey,error));
    });
  };
}

export function editFlagAPI(siteKey,sites){
	const editIndex=sites[siteKey].editFlagIndex;
	const updateFlag=sites[siteKey].flags[editIndex]
	return function(dispatch) {
    return updateExistingFlag(siteKey,editIndex,updateFlag.startDate,updateFlag.endDate,updateFlag.flagType).then(response => {
			if(response.stack){
				dispatch(flagSaveError(siteKey,response.message));
			}else{
				dispatch(flagSaveSucess(siteKey,response));
			}
    }).catch(error => {
      dispatch(flagSaveError(siteKey,error));
    });
  };
}

export const FLAG_REMOVE_SUCESS="FLAG_REMOVE_SUCESS";
export function flagRemoveSucess(siteKey){
  return {
		type:FLAG_REMOVE_SUCESS,
		siteKey:siteKey
	}
}

export const FLAG_REMOVE_ERROR="FLAG_REMOVE_ERROR";
export function flagRemoveError(siteKey,error){
  return {
		type:FLAG_REMOVE_ERROR,
		siteKey:siteKey,
		error:error
	}
}

export function removeFlagAPI(siteKey,sites){
	const removeIndex=sites[siteKey].removeFlagIndex;
	return function(dispatch) {
    return removeExistingFlag(siteKey,removeIndex).then(response => {
			if(response.stack){
				dispatch(flagRemoveError(siteKey,response.message));
			}else{
				dispatch(flagRemoveSucess(siteKey));
			}
    }).catch(error => {
      dispatch(flagRemoveError(siteKey,error));
    });
  };
}
