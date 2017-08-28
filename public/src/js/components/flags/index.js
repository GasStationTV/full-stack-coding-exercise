import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Flag from './flag';
import CreateFlag from './create';
import UpdateFlag from './update';

import getFlags from './actions';
import { updateIsVisible } from './create/actions';

class Flags extends React.Component {
  constructor() {
    super();

    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  /**
   * Dispatch action to get flags
   */
  getFlags() {
    this.context.store.dispatch(getFlags());
  }

  /**
   * Display table with flags
   */
  displayFlags() {
    const { reducer } = this.props;
    const rows = reducer.flags.map((flag) => {
      return <Flag key={ flag._id } flag={ flag }/>;
    });

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Site</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

  /**
   * Display message that no flags were found
   */
  static displayNoFlagsMessage() {
    return (
      <p>No Flags Found</p>
    );
  }

  handleCreateClick() {
    this.context.store.dispatch(updateIsVisible(true));
  }

  componentWillMount() {
    this.getFlags();
  }

  render() {
    const { reducer } = this.props;
    const content = reducer.flags.length >= 1 ? this.displayFlags() : Flags.displayNoFlagsMessage();

    return (
      <div className="flags">
        <h2>Flags</h2>
        <button type="button" className="btn btn-primary" onClick={this.handleCreateClick}>Create Flag</button>
        {content}
        <CreateFlag/>
        <UpdateFlag/>
      </div>
    );
  }
}

Flags.propTypes = {
  reducer: PropTypes.object.isRequired
};

Flags.contextTypes = {
  store: PropTypes.object
};

function mapStateToProps(state) {
  return {
    reducer: state.flagsReducer
  };
}

Flags = connect(
  mapStateToProps
)(Flags);

export default Flags;
