import {TOGGLE_OPEN_FLAG,OPEN_FLAG_MODAL,CLOSE_MODAL,FORM_CHANGE,
  FORM_SAVE,REMOVE_ALERT,CANCEL_REMOVE,CONFIRM_REMOVE,LOAD_SITES_SUCESS
  ,LOAD_SITES_ERROR,FLAG_SAVE_SUCESS,FLAG_SAVE_ERROR,FLAG_REMOVE_SUCESS
  ,FLAG_REMOVE_ERROR} from './siteActions'
const intialSitesList={}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          if(typeof obj[attr]=='object'){
            copy[attr]=clone(obj[attr]);
          }else{
            copy[attr] = obj[attr];
          }          
        }
    }
    return copy;
}

export function sitesReducer(state, action){
	state = state || intialSitesList;
  let newState=clone(state)
  if(!action.type.endsWith("ERROR")){
    Object.keys(newState).map((key, index)=>{
      newState[key].error=null;
      newState[key].flags.map((flag,index)=>{
        flag.error=null;
      })
    })
  }
  if(action.type==LOAD_SITES_SUCESS){
		return action.sites;
	}else if(action.type==LOAD_SITES_ERROR){
    return intialSitesList;
	}else if(action.type==TOGGLE_OPEN_FLAG){
    newState[action.siteKey]["openFlag"]=!newState[action.siteKey]["openFlag"];
		return newState;
	}else if(action.type==OPEN_FLAG_MODAL){
    newState[action.siteKey]["historyState"]=clone(newState[action.siteKey]);
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
    newState[action.siteKey]=clone(newState[action.siteKey]["historyState"]);
    newState[action.siteKey]["historyState"]=undefined;
    // newState[action.siteKey]["openModalFlag"]=false;
    // newState[action.siteKey]["mode"]=null;
    // newState[action.siteKey]["editFlagIndex"]=-1;
    // if (action.mode=="ADD"){
    //   newState[action.siteKey].flags.splice(-1,1);
    // }
		return newState;
	}else if(action.type==FORM_SAVE){
    newState[action.siteKey]["openModalFlag"]=false;
    newState[action.siteKey]["mode"]=null;
    newState[action.siteKey]["editFlagIndex"]=-1;
		return newState;
	}else if(action.type==FORM_CHANGE){
    let editFlag=newState[action.siteKey].flags[newState[action.siteKey].editFlagIndex];
    editFlag[action.name]=action.value;
		return newState;
	}else if(action.type==FLAG_SAVE_SUCESS){
    let updatedFlag=newState[action.siteKey].flags[newState[action.siteKey].editFlagIndex];
    updatedFlag=action.newF;
    newState[action.siteKey]["openModalFlag"]=false;
    newState[action.siteKey]["mode"]=null;
    newState[action.siteKey]["editFlagIndex"]=-1;
		return newState;
	}else if(action.type==FLAG_SAVE_ERROR){
    let errorFlag=newState[action.siteKey].flags[newState[action.siteKey].editFlagIndex];
    errorFlag["error"]=action.error;
		return newState;
	}else if(action.type==REMOVE_ALERT){
    newState[action.siteKey].removeAlertFlag=true;
    newState[action.siteKey].removeFlagIndex=action.flagIndex;
		return newState;
	}else if(action.type==CANCEL_REMOVE){
    newState[action.siteKey].removeAlertFlag=false;
    newState[action.siteKey].removeFlagIndex=-1;
		return newState;
	}else if(action.type==CONFIRM_REMOVE){
    newState[action.siteKey].flags.splice(newState[action.siteKey].removeFlagIndex, 1);
    newState[action.siteKey].removeAlertFlag=false;
    newState[action.siteKey].removeFlagIndex=-1;
		return newState;
	}else if(action.type==FLAG_REMOVE_SUCESS){
    newState[action.siteKey].flags.splice(newState[action.siteKey].removeFlagIndex, 1);
    newState[action.siteKey].removeAlertFlag=false;
    newState[action.siteKey].removeFlagIndex=-1;
		return newState;
	}else if(action.type==FLAG_REMOVE_ERROR){
    newState[action.siteKey].error=action.error;
		return newState;
	}
	return state
}
