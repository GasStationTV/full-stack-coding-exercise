import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as FlagFormActions from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  Paper,
  SelectField,
  DatePicker,
  RaisedButton,
  FlatButton,
  MenuItem,
  Dialog
} from 'material-ui';

class FlagForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flagType: '',
      startDate: new Date(),
      endDate: new Date(),
      flagId: null,
      sceneHeaderText: '',
      submitBtnText: '',
      errorMessage: '',
      openDialog: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.toHomeScene = this.toHomeScene.bind(this);
    this.handleFlagFetch = this.handleFlagFetch.bind(this);
    this.closeValidationDialog = this.closeValidationDialog.bind(this);
  }

  componentWillMount() {
    const { flagId } = this.props;
    this.determineSceneText(flagId);
    this.handleFlagFetch(flagId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  handleChange(event, index, flagType) {
    this.setState({flagType});
  }

  toHomeScene() {
    this.props.history.push('/');
  }

  validateDates() {
    const {
      startDate,
      endDate
    } = this.state;
    let errorMessage = '';
    if (moment(startDate).isAfter(endDate)) {
      errorMessage = `Unable to Create/Update:\n
      The start date must be before the end date`;

    } else if (moment(endDate).isBefore(startDate)) {
      errorMessage = `Unable to Create/Update:\n
      The start date must be before the date time`;

    } else if (moment(startDate).isSame(endDate)) {
      errorMessage = `Unable to Create/Update:\n
      The start date may not be the same date as the end date`;
    }
    return errorMessage;
  }

  validateNullData() {
    const { flagType } = this.state;
    let errorMessage = '';
    if (!flagType) {
      errorMessage = `Unable to Create/Update: Flag type is required.`;
    }
    return errorMessage;
  }

  validateMalformedData() {
    //form doesn't need malformed data validation at this time
    return '';
  }

  createValidationMessage(fn) {
    const dateValidationMessage = this.validateDates();
    const nullValidationMessage = this.validateNullData();
    const malformedValidationMessage = this.validateMalformedData();
    let errorMessage = '';
    if (
      dateValidationMessage
      ||
      nullValidationMessage
      ||
      malformedValidationMessage
    ) {
      errorMessage = (
        <div>
          <p>{dateValidationMessage}</p>
          <p>{nullValidationMessage}</p>
          <p>{malformedValidationMessage}</p>
        </div>
      );
    }
    this.setState({ errorMessage }, () => fn());
  }

  isSubmitDataValid() {
    let isValid = true;
    if (this.state.errorMessage) {
      isValid = false;
    }
    return isValid;
  }

  closeValidationDialog() {
    //TODO: create clearValidationMessage fn
    this.setState({
      openDialog: false,
      errorMessage: ''
    });
  }

  openValidationDialog() {
    this.setState({ openDialog: true });
  }

  renderValidationDialog() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.closeValidationDialog}
      />
    ];
    return (
      <div>
        <Dialog
          title="Validation Error!"
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.closeValidationDialog}
        >
          {this.state.errorMessage}
        </Dialog>
      </div>
    );
  }

  handleSave() {
    const { flagType, startDate, endDate } = this.state;
    if (this.isSubmitDataValid()) {
      if (this.props.flagId) {
        this.props.actions.updateSingleFlagRequest(
          {
            flagType,
            startDate,
            endDate
          },
          this.props.flagId
        );
      } else {
        this.props.actions.createFlagRequest({
          flagType,
          startDate,
          endDate
        });
      }
      this.toHomeScene();
    } else {
      this.openValidationDialog();
    }
  }

  handleDate(date, fieldName){
    const newDate = {};
    newDate[fieldName] = date;
    this.setState(newDate);
  }

  handleFlagFetch(flagId) {
    if (flagId) {
      this.props.actions.fetchSingleFlagRequest(flagId);
    }
  }

  determineSceneText(flagId) {
    let sceneHeaderText;
    let submitBtnText;
    if (flagId) {
      sceneHeaderText = 'Edit flag';
      submitBtnText = 'Save';
    } else {
      sceneHeaderText = 'Create flag';
      submitBtnText = 'Create';
    }
    this.setState({
      sceneHeaderText,
      submitBtnText
    });
  }

  render() {
    const {
      flagType,
      startDate,
      endDate,
      sceneHeaderText,
      submitBtnText
    } = this.state;

    return (
      <Paper className="pageForm">
        {this.renderValidationDialog()}
        <h1>{sceneHeaderText}</h1>
        <SelectField
          floatingLabelText="Select Flag type..."
          value={flagType}
          onChange={this.handleChange}
           className="fullWidth"
        >
          <MenuItem
            value="Advertiser - Location Priority"
            primaryText="Advertiser - Location Priority"
          />
          <MenuItem
            value="Retailer - Location Priority"
            primaryText="Retailer - Location Priority"
          />
          <MenuItem
            value="Retailer - Showcase"
            primaryText="Retailer - Showcase"
          />
          <MenuItem
            value="GSTV - Site Visit"
            primaryText="GSTV - Site Visit"
          />
          <MenuItem
            value="GSTV - Showcase"
            primaryText="GSTV - Showcase"
          />
          <MenuItem
            value="GSTV - GSTV - Nielsen Survey"
            primaryText="GSTV - GSTV - Nielsen Survey"
          />
          <MenuItem
            value="GSTV - GSTV - Research Survey"
            primaryText="GSTV - GSTV - Research Survey"
          />
          <MenuItem
            value="GSTV - Unsellable"
            primaryText="GSTV - Unsellable"
          />
        </SelectField>
        <div className="datePicker">
          <DatePicker
            hintText="en-US locale"
            locale="en-US"
            firstDayOfWeek={0}
            value={startDate}
            onChange={(event, date) => this.handleDate(date, 'startDate')}
            hintText="Start Date"
          />
          <DatePicker
            hintText="en-US locale"
            locale="en-US"
            firstDayOfWeek={0}
            value={endDate}
            onChange={(event, date) => this.handleDate(date, 'endDate')}
            hintText="End Date"
          />
        </div>
        <div className="buttonHolder">
          <FlatButton
            onClick={this.toHomeScene}
            label="Cancel"
            secondary={true}
          />
          <FlatButton
            onClick={() => this.createValidationMessage(this.handleSave)}
            label={submitBtnText}
            primary={true}
          />
        </div>
      </Paper>
    );
  }
}

FlagForm.PropTypes = {
  flagType: PropTypes.string.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  flagId: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

function mapStateToProps(state, {match}) {
  return {
    flagType: state.FlagFormReducer.flagType,
    startDate: new Date(state.FlagFormReducer.startDate),
    endDate: new Date(state.FlagFormReducer.endDate),
    flagId: match.params.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(FlagFormActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlagForm));
