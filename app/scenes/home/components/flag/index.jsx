import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RaisedButton,
  TableRow,
  TableRowColumn
} from 'material-ui';

class Flag extends Component {
  render() {
    const { flagType, startDate, endDate, id } = this.props;
    return (
      <TableRow key={id}>
        <TableRowColumn>{flagType}</TableRowColumn>
        <TableRowColumn>{startDate}</TableRowColumn>
        <TableRowColumn>{endDate}</TableRowColumn>
        <TableRowColumn>
          <RaisedButton label="Edit" />
          <RaisedButton label="Delete" />
        </TableRowColumn>
      </TableRow>
    );
  }
}

Flag.PropTypes = {
  id: PropTypes.String.isRequired,
  flagType: PropTypes.String.isRequired,
  startDate: PropTypes.String,
  endDate: PropTypes.String
};

export default Flag;
