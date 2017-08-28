import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'react-bootstrap';

import removeFlag from './actions';
import { updateIsVisible, setFlagState } from '../update/actions';

class Flag extends React.Component {
  constructor() {
    super();

    this.state = {
      isRemoveModalOpen: false
    };

    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.openRemoveModal = this.openRemoveModal.bind(this);
    this.closeRemoveModal = this.closeRemoveModal.bind(this);
    this.removeFlag = this.removeFlag.bind(this);
  }

  /**
   * Update isEditModalOpen to true (open modal)
   */
  openEditModal() {
    const { flag } = this.props;

    this.context.store.dispatch(updateIsVisible(true));
    this.context.store.dispatch(setFlagState(flag));
  }

  /**
   * Update isEditModalOpen to false (close modal)
   */
  closeEditModal() {
    this.setState({
      isEditModalOpen: false
    });
  }

  /**
   * Update isRemoveModalOpen to true (open modal)
   */
  openRemoveModal() {
    this.setState({
      isRemoveModalOpen: true
    });
  }

  /**
   * Update isRemoveModalOpen to false (close modal)
   */
  closeRemoveModal() {
    this.setState({
      isRemoveModalOpen: false
    });
  }

  /**
   * Close the modal and dispatch action to remove flag
   */
  removeFlag() {
    const { flag } = this.props;

    this.closeRemoveModal();
    this.context.store.dispatch(removeFlag(flag._id));
  }

  /**
   * If isRemoveModalOpen is true display the modal to confirm removal
   */
  renderRemoveModal() {
    if (this.state.isRemoveModalOpen) {
      return (
        <Modal show={this.state.isRemoveModalOpen} onHide={this.closeRemoveModal} backdrop={'static'}>
          <Modal.Body>
            <p>Do you want to remove flag?</p>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-default" onClick={this.closeRemoveModal}>Cancel</button>
            <button className="btn btn-danger" onClick={this.removeFlag}>Continue</button>
          </Modal.Footer>
        </Modal>
      );
    }

    return null;
  }

  render() {
    const { flag } = this.props;
    const formattedStartDate = flag.start_date ? moment(flag.start_date).format('YYYY-MM-DD') : '';
    const formattedEndDate = flag.end_date ? moment(flag.end_date).format('YYYY-MM-DD') : '';

    return (
      <tr className="flag">
        <td>{flag.site_id}</td>
        <td>{flag.type}</td>
        <td>{formattedStartDate}</td>
        <td>{formattedEndDate}</td>
        <td className="text-right">
          <div className="btn-group" role="group" aria-label="Action Buttons">
            <button type="button" className="btn btn-primary" onClick={this.openEditModal}>Edit</button>
            <button type="button" className="btn btn-danger" onClick={this.openRemoveModal}>Remove</button>
            {this.renderRemoveModal()}
          </div>
        </td>
      </tr>
    );
  }
}

Flag.propTypes = {
  flag: PropTypes.object.isRequired
};

Flag.contextTypes = {
  store: PropTypes.object
};

export default Flag;
