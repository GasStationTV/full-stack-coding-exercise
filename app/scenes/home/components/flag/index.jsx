import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  FlatButton,
  TableRow,
  TableRowColumn
} from 'material-ui';

class Flag extends Component {
  formatDate(date) {
    return moment(date).format('MM/DD/YYYY').toString();
  }
  render() {
    const {
      flagType,
      startDate,
      endDate,
      id,
      deleteMethod,
      editMethod
    } = this.props;
    return (
      <TableRow key={id}>
        <TableRowColumn>{flagType}</TableRowColumn>
        <TableRowColumn>{this.formatDate(startDate)}</TableRowColumn>
        <TableRowColumn>{this.formatDate(endDate)}</TableRowColumn>
        <TableRowColumn>
          <FlatButton
            primary={true}
            label="Edit"
            onClick={editMethod}
          />
          <FlatButton
            label="Delete"
            secondary={true}
            onClick={deleteMethod}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

Flag.PropTypes = {
  id: PropTypes.string.isRequired,
  flagType: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string
};

export default Flag;
