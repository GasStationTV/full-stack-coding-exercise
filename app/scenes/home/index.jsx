import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
const styles = require('./styles.styl');
import * as HomeActions from './actions';
import Flag from './components/flag';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  Dialog,
  FlatButton,
  RaisedButton,
  Paper
} from 'material-ui';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flags: [],
      openDialog: false,
      idOfFlagToDelete: 0
    };
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
    this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
    this.handleFlagDelete = this.handleFlagDelete.bind(this);
    this.renderDeleteDialog = this.renderDeleteDialog.bind(this);
    this.renderFlagTable = this.renderFlagTable.bind(this);
    this.renderCreateNewFlag = this.renderCreateNewFlag.bind(this);
    this.renderNoFlagsFound = this.renderNoFlagsFound.bind(this);
    this.whichViewToRender = this.whichViewToRender.bind(this);
    this.toNewFlagScene = this.toNewFlagScene.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchAllFlagsRequest();
  }

  openDeleteDialog(id) {
    this.setState({
      openDialog: true,
      idOfFlagToDelete: id
    });
  }

  closeDeleteDialog() {
    this.setState({openDialog: false});
  }

  handleFlagDelete() {
    this.props.actions.deleteFlagRequest(this.state.idOfFlagToDelete);
    this.closeDeleteDialog();
  }

  toEditFlagScene(id) {
    this.props.history.push(`/flag/update/${id}`);
  }

  toNewFlagScene() {
    this.props.history.push(`/flag/new`);
  }

  renderDeleteDialog() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeDeleteDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleFlagDelete}
      />,
    ];
    return (
      <div>
        <Dialog
          title="Delete Flag"
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.closeDeleteDialog}
        >
          Are you sure you want to delete this Flag?
        </Dialog>
      </div>
    );
  }

  renderCreateNewFlag() {
    return (
      <RaisedButton
        onClick={this.toNewFlagScene}
        primary={true}
        label="Create new flag"
      />
    );
  }

  renderNoFlagsFound() {
    return (
      <div style={styles.noFlagsMessage}>
        <Paper style={styles.paper}>
          <h3>There are no site flags.</h3>
          {this.renderCreateNewFlag()}
        </Paper>
      </div>
    );
  }

  renderFlagTable(flags) {
    return (
      <div>
        {this.renderDeleteDialog()}
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Flag Type</TableHeaderColumn>
              <TableHeaderColumn>Start Date</TableHeaderColumn>
                <TableHeaderColumn>End Date</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {flags.map((flag, index) =>
              <Flag
                id={flag._id}
                key={index}
                flagType={flag.flagType}
                startDate={flag.startDate}
                endDate={flag.endDate}
                deleteMethod={() => this.openDeleteDialog(flag._id)}
                editMethod={() => this.toEditFlagScene(flag._id)}
              />
            )}
          </TableBody>
        </Table>
        <div style={styles.buttonHolder}>{this.renderCreateNewFlag()}</div>
      </div>
    );
  }

  whichViewToRender(flags) {
    let viewToRender;
    if (flags.length > 0) {
      viewToRender = this.renderFlagTable(flags);
    } else {
      viewToRender = this.renderNoFlagsFound();
    }
    return (viewToRender);
  }

  render() {
    const { flags } = this.props;
    return (
      <div>
        {this.whichViewToRender(flags)}
      </div>
    );
  }
}

Home.PropTypes = {
  flags: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

function mapStateToProps(state) {
  return {
    flags: state.HomeReducer.flags
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(HomeActions, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
