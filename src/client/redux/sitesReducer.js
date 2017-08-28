import {TOGGLE_OPEN_FLAG,OPEN_FLAG_MODAL,CLOSE_MODAL,FORM_CHANGE,
  FORM_SAVE,REMOVE_ALERT,CANCEL_REMOVE,CONFIRM_REMOVE,LOAD_SITES_SUCESS
  ,LOAD_SITES_ERROR,FLAG_SAVE_SUCESS,FLAG_SAVE_ERROR,FLAG_REMOVE_SUCESS
  ,FLAG_REMOVE_ERROR} from './siteActions'
const intialSitesList={}

export function sitesReducer(state, action){
	state = state || intialSitesList;
  if(action.type==LOAD_SITES_SUCESS){
		return action.sites;
	}else if(action.type==LOAD_SITES_ERROR){
    return intialSitesList;
	}else if(action.type==TOGGLE_OPEN_FLAG){
    let newState=Object.assign({}, state);
    newState[action.siteKey]["openFlag"]=!newState[action.siteKey]["openFlag"];
		return newState;
	}else if(action.type==OPEN_FLAG_MODAL){
    let newState=Object.assign({}, state);
    newState[action.siteKey]["openModalFlag"]=true;
    newState[action.siteKey]["mode"]=action.mode;
    if (action.mode=="ADD"){
      newState[action.siteKey].flags.push({startDate:"",endDate:"",flagType:""});
      newState[action.siteKey]["editFlagIndex"]=newState[action.siteKey].flags.length-1;
    }else{
      newState[action.siteKey]["editFlagIndex"]=action.flagIndex;
    }
		return newState;
	}else if(action.type==CLOSE_MODAL){
    let newState=Object.assign({}, state);
    newState[action.siteKey]["openModalFlag"]=false;
    newState[action.siteKey]["mode"]=null;
    newState[action.siteKey]["editFlagIndex"]=-1;
    if (action.mode=="ADD"){
      newState[action.siteKey].flags.splice(-1,1);
    }
		return newState;
	}else if(action.type==FORM_SAVE){
    let newState=Object.assign({}, state);
    newState[action.siteKey]["openModalFlag"]=false;
    newState[action.siteKey]["mode"]=null;
    newState[action.siteKey]["editFlagIndex"]=-1;
		return newState;
	}else if(action.type==FORM_CHANGE){
    let newState=Object.assign({}, state);
    let editFlag=newState[action.siteKey].flags[newState[action.siteKey].editFlagIndex];
    editFlag[action.name]=action.value;
		return newState;
	}else if(action.type==FLAG_SAVE_SUCESS){
    let newState=Object.assign({}, state);
    let updatedFlag=newState[action.siteKey].flags[newState[action.siteKey].editFlagIndex];
    updatedFlag=action.newF;
    newState[action.siteKey]["openModalFlag"]=false;
    newState[action.siteKey]["mode"]=null;
    newState[action.siteKey]["editFlagIndex"]=-1;
		return newState;
	}else if(action.type==FLAG_SAVE_ERROR){
    let newState=Object.assign({}, state);
    let errorFlag=newState[action.siteKey].flags[newState[action.siteKey].editFlagIndex];
    errorFlag["error"]=action.error;
		return newState;
	}else if(action.type==REMOVE_ALERT){
    let newState=Object.assign({}, state);
    newState[action.siteKey].removeAlertFlag=true;
    newState[action.siteKey].removeFlagIndex=action.flagIndex;
		return newState;
	}else if(action.type==CANCEL_REMOVE){
    let newState=Object.assign({}, state);
    newState[action.siteKey].removeAlertFlag=false;
    newState[action.siteKey].removeFlagIndex=-1;
		return newState;
	}else if(action.type==CONFIRM_REMOVE){
    let newState=Object.assign({}, state);
    newState[action.siteKey].flags.splice(newState[action.siteKey].removeFlagIndex, 1);
    newState[action.siteKey].removeAlertFlag=false;
    newState[action.siteKey].removeFlagIndex=-1;
		return newState;
	}else if(action.type==FLAG_REMOVE_SUCESS){
    let newState=Object.assign({}, state);
    newState[action.siteKey].flags.splice(newState[action.siteKey].removeFlagIndex, 1);
    newState[action.siteKey].removeAlertFlag=false;
    newState[action.siteKey].removeFlagIndex=-1;
		return newState;
	}else if(action.type==FLAG_REMOVE_ERROR){
    let newState=Object.assign({}, state);
    newState[action.siteKey].error=action.error;
		return newState;
	}
	return state
}
