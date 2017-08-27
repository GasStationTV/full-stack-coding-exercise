import {TOGGLE_OPEN_FLAG,OPEN_FLAG_MODAL,CLOSE_MODAL,FORM_CHANGE,FORM_SAVE,REMOVE_ALERT,CANCEL_REMOVE,CONFIRM_REMOVE} from './siteActions'
const intialSitesList={
  1:{name:"Bob's Fuel",address:"743 E Campbell RD, Richardson TX",
    flags:[
      {startDate:"2017-08-24",flagType:"GSTV - Nielsen Survey"},
      {startDate:"2017-04-03",flagType:"Retailer - Location Priority"},
      {startDate:"2017-07-10",endDate:"2017-12-10",flagType:"Retailer - Location Priority"}
    ],
    openFlag:false,
    openModalFlag:false,
    mode:null,
    editFlagIndex:-1,
    removeAlertFlag:false,
    removeFlagIndex:-1
  },
  2:{name:"Shell #367",address:"220 Leigh Farm RD, Durham NC",
    flags:[
      {startDate:"2017-04-03",endDate:"2017-08-23",flagType:"Retailer - Showcase"},
      {startDate:"2017-07-10",endDate:"2017-12-10",flagType:"Advertiser - Location Priority"}
    ],
    openFlag:false,
    openModalFlag:false,
    mode:null,
    editFlagIndex:-1,
    removeAlertFlag:false,
    removeFlagIndex:-1
  },
  3:{name:"Family Fair",address:"967 Chapel Hill RD, Morrisville NC",
      flags:[],
      openFlag:false,
      openModalFlag:false,
      mode:null,
      editFlagIndex:-1,
      removeAlertFlag:false,
      removeFlagIndex:-1
  }
}
export function sitesReducer(state, action){
	state = state || intialSitesList;
  if(action.type==TOGGLE_OPEN_FLAG){
    let newState=Object.assign({}, state);
    newState[action.siteKey]["openFlag"]=!newState[action.siteKey]["openFlag"];
		return newState;
	}else if(action.type==OPEN_FLAG_MODAL){
    let newState=Object.assign({}, state);
    newState[action.siteKey]["openModalFlag"]=true;
    newState[action.siteKey]["mode"]=action.mode;
    if (action.mode=="ADD"){
      newState[action.siteKey].flags.push({startDate:"2017-04-03",endDate:"",flagType:""});
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
	}
	return state
}
