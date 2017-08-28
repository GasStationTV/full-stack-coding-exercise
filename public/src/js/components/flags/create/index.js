import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../style.scss';

import { updateIsVisible, updateFlagType, updateFlagStartDate, updateFlagEndDate, createFlag } from './actions';

class FlagCreate extends React.Component {
  constructor() {
    super();

    this.displayForm = this.displayForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleUpdateFlagType = this.handleUpdateFlagType.bind(this);
    this.handleUpdateFlagStartDate = this.handleUpdateFlagStartDate.bind(this);
    this.handleUpdateFlagEndDate = this.handleUpdateFlagEndDate.bind(this);
  }

  /**
   * Dispatch action to update isVisible property
   * @param {Boolean} isVisible - True if visible, false if not
   */
  handleUpdateIsVisible(isVisible) {
    this.context.store.dispatch(updateIsVisible(isVisible));
  }

  /**
   * Dispatch action to update type of flag
   * @param {Object} type - The selected option from the dropdown
   */
  handleUpdateFlagType(type) {
    this.context.store.dispatch(updateFlagType(type.value));
  }

  /**
   * Dispatch action to update start date of flag
   * @param {Object} startDate - MomentJS date representing flag's start date
   */
  handleUpdateFlagStartDate(startDate) {
    this.context.store.dispatch(updateFlagStartDate(startDate));
  }

  /**
   * Dispatch action to update end date of flag
   * @param {Object} startDate - MomentJS date representing flag's end date
   */
  handleUpdateFlagEndDate(endDate) {
    this.context.store.dispatch(updateFlagEndDate(endDate));
  }

  /**
   * Dispatch action to create a new flag
   */
  handleFormSubmit(e) {
    e.preventDefault();

    const { reducer } = this.props;

    this.context.store.dispatch(createFlag(reducer.flag));
  }

  /**
   * Display validation errors from API
   */
  displayErrors() {
    const { reducer } = this.props;

    if (reducer.errors.length) {
      return reducer.errors.map((error) => {
        return (
          <p className="text-danger text-capitalize" key={error}>{error}</p>
        );
      });
    }

    return null;
  }

  displayForm() {
    const { reducer } = this.props;
    const typeOptions = [{
      value: 'Advertiser - Location Priority',
      label: 'Advertiser - Location Priority'
    }, {
      value: 'Retailer - Location Priority',
      label: 'Retailer - Location Priority'
    }, {
      value: 'Retailer - Showcase',
      label: 'Retailer - Showcase'
    }, {
      value: 'GSTV - Site Visit',
      label: 'GSTV - Site Visit'
    }, {
      value: 'GSTV - Showcase',
      label: 'GSTV - Showcase'
    }, {
      value: 'GSTV - Nielsen Survey',
      label: 'GSTV - Nielsen Survey'
    }, {
      value: 'GSTV - Research Survey',
      label: 'GSTV - Research Survey'
    }, {
      value: 'GSTV - Unsellable',
      label: 'GSTV - Unsellable'
    }];

    if (reducer.isVisible) {
      return (
        <Modal show={reducer.isVisible} onHide={() => { this.handleUpdateIsVisible(false); }} backdrop={'static'}>
          <Modal.Body>
            <h3>Create New Flag</h3>
            {this.displayErrors()}
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="flagType">Type</label>
                <Select
                  name="flagType"
                  value={reducer.flag.type}
                  options={typeOptions}
                  onChange={this.handleUpdateFlagType}
                />
              </div>
              <div className="form-group">
                <label htmlFor="flagStartDate">Start Date</label>
                <DatePicker
                  className="form-control"
                  selected={reducer.flag.start_date}
                  onChange={this.handleUpdateFlagStartDate}
                  maxDate={moment(reducer.flag.end_date).subtract(1, 'day')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="flagEndDate">End Date</label>
                <DatePicker
                  className="form-control"
                  selected={reducer.flag.end_date}
                  onChange={this.handleUpdateFlagEndDate}
                  minDate={moment(reducer.flag.start_date).add(1, 'day')}
                />
              </div>
              <div className="text-right">
                <button className="btn btn-default margin-right-5" onClick={() => { this.handleUpdateIsVisible(false); }}>Cancel</button>
                <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmission}>Submit</button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      );
    }

    return null;
  }

  render() {
    return this.displayForm();
  }
}

FlagCreate.propTypes = {
  reducer: PropTypes.object.isRequired
};

FlagCreate.contextTypes = {
  store: PropTypes.object
};

function mapStateToProps(state) {
  return {
    reducer: state.flagCreateReducer
  };
}

FlagCreate = connect(
  mapStateToProps
)(FlagCreate);

export default FlagCreate;
