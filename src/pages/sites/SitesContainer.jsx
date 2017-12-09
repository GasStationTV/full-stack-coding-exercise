import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { load as loadSites } from './SitesReducer';
import SitesView from './SitesView';

class SitesContainer extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    sites: PropTypes.array
  };
  componentDidMount() {
    this.props.loadSites();
  }

  render() {
    if (this.props.loading) {
      return <div>Loading Sites...</div>;
    }
    if (this.props.error) {
      return <div>Whoops something is wrong...</div>;
    }
    return <SitesView {...this.props} />;
  }
}

const mapStateToProps = state => ({
  error: state.sites.error,
  loading: state.sites.loading,
  sites: state.sites.list
});

const mapDispatchToProps = {
  loadSites
};

export default connect(mapStateToProps, mapDispatchToProps)(SitesContainer);
