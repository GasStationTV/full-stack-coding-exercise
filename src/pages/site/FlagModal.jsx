import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { DatePicker, SelectField } from 'redux-form-material-ui';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Modal from 'react-modal';
import MenuItem from 'material-ui/MenuItem';

import { dateCheck, required } from './validations';

class FlagModal extends React.Component {
  static propTypes = {
    clearError: PropTypes.func,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    submitError: PropTypes.string,
    logout: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    router: PropTypes.object,
    submitting: PropTypes.bool,
    flag: PropTypes.object.isRequired,
    isOpen: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      formError: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset() {
    this.props.reset('flagForm');
    this.setState({
      formError: null
    });
  }

  componentWillMount() {
    this.reset();
  }

  closeModal() {
    this.reset();
    this.props.closeModal();
  }

  handleSubmit(values) {
    console.log('values', values);
    this.validateFields(values);
    const flag = {
      _id: this.props.flag._id,
      ...values
    };
    this.props.onSubmit(flag);
    this.reset();
  }

  validateFields(values) {
    const invalidType = required(values.type);
    const invalidDate = dateCheck(values.startDate, values.endDate);
    if (invalidType || invalidDate) {
      this.setState({
        formError: invalidType || invalidDate
      });
      return null;
    }
  }

  get selectOptions() {
    return [
      'Advertiser - Location Priority',
      'Retailer - Location Priority',
      'Retailer - Showcase',
      'GSTV - Site Visit',
      'GSTV - Showcase',
      'GSTV - Nielsen Survey',
      'GSTV - Research Survey',
      'GSTV - Unsellable'
    ];
  }

  render() {
    const { error, handleSubmit, submitError, submitting } = this.props;
    const { formError } = this.state;
    return (
      <Modal
        ariaHideApp={false}
        style={{ content: { background: 'none', border: 'none' } }}
        isOpen={this.props.isOpen}
      >
        <Paper
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            padding: '20px 70px',
            transform: 'translate(-50%, -50%)',
            background: 'rgb(250, 250, 250)'
          }}
          zDepth={4}
        >
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <div style={{ margin: '10px 0' }}>
              <Field
                name="type"
                type="select"
                component={SelectField}
                floatingLabelText="Flag Type"
                floatingLabelFocusStyle={{ color: '#ff5c5c' }}
                underlineFocusStyle={{ borderColor: '#ff5c5c' }}
                errorStyle={{
                  fontStyle: 'italic',
                  position: 'absolute',
                  transform: 'translate(50%, 250%)'
                }}
              >
                {this.selectOptions.map((opt, idx) => (
                  <MenuItem key={idx} value={opt} primaryText={opt} />
                ))}
              </Field>
            </div>
            <div style={{ margin: '10px 0' }}>
              <Field
                name="startDate"
                component={DatePicker}
                floatingLabelText="Start Date"
                floatingLabelFocusStyle={{ color: '#ff5c5c' }}
                underlineFocusStyle={{ borderColor: '#ff5c5c' }}
                errorStyle={{
                  fontStyle: 'italic',
                  position: 'absolute',
                  transform: 'translate(50%, 250%)'
                }}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <div style={{ margin: '10px 0' }}>
              <Field
                name="endDate"
                component={DatePicker}
                floatingLabelText="End Date"
                floatingLabelFocusStyle={{ color: '#ff5c5c' }}
                underlineFocusStyle={{ borderColor: '#ff5c5c' }}
                errorStyle={{
                  fontStyle: 'italic',
                  position: 'absolute',
                  transform: 'translate(50%, 250%)'
                }}
                style={{ cursor: 'pointer' }}
              />
            </div>
            {(error || submitError || formError) && (
              <strong
                style={{
                  color: 'red',
                  fontStyle: 'italic',
                  position: 'absolute',
                  fontSize: '12px'
                }}
              >
                {error || submitError || formError}
              </strong>
            )}
            <div style={{ paddingTop: '35px' }}>
              <RaisedButton type="submit" disabled={submitting}>
                Submit
              </RaisedButton>
              <RaisedButton
                disabled={submitting}
                onClick={() => this.closeModal()}
                style={{ float: 'right' }}
              >
                Close
              </RaisedButton>
            </div>
          </form>
        </Paper>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'flagForm', // a unique identifier for this form,
  enableReinitialize: true
})(FlagModal);
