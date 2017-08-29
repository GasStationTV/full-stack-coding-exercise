import React, { Component } from 'react';
import {connect} from 'react-redux';
import Sites from './Sites'
import Navigation from './Navigation'
import {toggleOpenFlag,openModal,cancelModal,handleChange,saveModal,
  removeAlertFunc,handleAlertDismiss,removeConfirm,loadSitesFromAPI,addFlagAPI
  ,editFlagAPI,removeFlagAPI,flagSaveError} from '../redux/siteActions'
import { Row,Alert} from 'react-bootstrap';

class App extends Component{
  constructor(props) {
    super(props);
    this.toggleOpenFlag = this.toggleOpenFlag.bind(this);
    this.openModal=this.openModal.bind(this);
    this.cancelModal=this.cancelModal.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.saveModal=this.saveModal.bind(this);
    this.handleDateChange=this.handleDateChange.bind(this);
    this.removeAlertFunc=this.removeAlertFunc.bind(this);
    this.handleAlertDismiss=this.handleAlertDismiss.bind(this);
    this.removeConfirm=this.removeConfirm.bind(this);
  }
  componentWillMount(){
    const promise=this.props.dispatch(loadSitesFromAPI());
    promise.then(()=>{},(error)=>{
      console.log("Application failed to load intial data")
    })
  }
  toggleOpenFlag(siteKey){
    this.props.dispatch(toggleOpenFlag(siteKey));
  }
  openModal(siteKey,mode,flagIndex){
    this.props.dispatch(openModal(siteKey,mode,flagIndex));
  }
  cancelModal(siteKey,mode){
    this.props.dispatch(cancelModal(siteKey,mode));
  }
  saveModal(siteKey,mode){
    const candidateFlag=this.props.sitesList[siteKey].flags[this.props.sitesList[siteKey].editFlagIndex]
    let validationError=''
    if(candidateFlag.startDate.length!=0 && candidateFlag.endDate.length!=0){
      if(new Date(candidateFlag.startDate)>=new Date(candidateFlag.endDate)){
        validationError=validationError+' End Date must be after Start Date.'
      }
    }
    if(new Date()>=new Date(candidateFlag.endDate)){
      validationError=validationError+' End Date must be today or in future'
    }
    if(candidateFlag.flagType.length==0){
      validationError=validationError+' Flag Type is required'
    }
    if (validationError!=''){
      this.props.dispatch(flagSaveError(siteKey,validationError));
    }else{
      if(mode=='ADD'){
        this.props.dispatch(addFlagAPI(siteKey,this.props.sitesList));
      }else{
        this.props.dispatch(editFlagAPI(siteKey,this.props.sitesList));
      }
    }
  }
  handleChange(event,siteKey){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.dispatch(handleChange(siteKey,name,value));
  }
  handleDateChange(date,evt,siteKey,fieldName){
    evt.preventDefault()
    const value=date.toISOString().slice(0, 10);
    this.props.dispatch(handleChange(siteKey,fieldName,value));
  }
  removeAlertFunc(siteKey,flagIndex){
    this.props.dispatch(removeAlertFunc(siteKey,flagIndex));
  }
  handleAlertDismiss(siteKey){
    this.props.dispatch(handleAlertDismiss(siteKey));
  }
  removeConfirm(siteKey){
    this.props.dispatch(removeFlagAPI(siteKey,this.props.sitesList));
  }
  render() {
    return (
    <Row>
      <Row>
        <Navigation/>
      </Row>
      <Row>
        <Sites sitesList={this.props.sitesList} toggleFunc={this.toggleOpenFlag}
        modalCancelFunc={this.cancelModal} modalSaveFunc={this.saveModal} openModalFunc={this.openModal}
         handleChange={this.handleChange} handleDateChange={this.handleDateChange}
         removeAlertFunc={this.removeAlertFunc} handleAlertDismiss={this.handleAlertDismiss}
         removeConfirm={this.removeConfirm} flagsList={this.props.flagsList}/>
      </Row>
    </Row>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
		sitesList:state.sitesReducer,
    flagsList:state.flagsListReducer
  }
}
const Container = connect(mapStateToProps)(App);
export default Container;
