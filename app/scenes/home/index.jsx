import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as HomeActions from './actions';
import Flag from './components/flag';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flags: []
    };
  }
  render() {
    const { flags } = this.state;
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Flag Type</TableHeaderColumn>
              <TableHeaderColumn>Start Date</TableHeaderColumn>
                <TableHeaderColumn>End Date</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flags.map((flag, index) =>
              <Flag
                id={flag._id}
                flagType={flag.flagType}
                startDate={flag.startDate}
                endDate={flag.endDate}
              />
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Home.PropTypes = {
  flags: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    flags: state.flags
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(HomeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
