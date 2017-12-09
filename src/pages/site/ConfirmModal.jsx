import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import RaisedButton from 'material-ui/RaisedButton';

const modalStyle = {
  content: {
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '150px'
  }
};

export default class ConfirmModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    flag: PropTypes.object,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
  };
  render() {
    return (
      <Modal isOpen={this.props.isOpen} style={modalStyle} ariaHideApp={false}>
        <div>
          Are you sure you want to delete flag with id {this.props.flag._id}?
        </div>
        <div style={{ marginTop: '20px' }}>
          <RaisedButton
            onClick={() => this.props.onConfirm(this.props.flag._id)}
          >
            Confirm
          </RaisedButton>
          <RaisedButton
            onClick={this.props.onCancel}
            style={{ float: 'right' }}
          >
            Cancel
          </RaisedButton>
        </div>
      </Modal>
    );
  }
}
