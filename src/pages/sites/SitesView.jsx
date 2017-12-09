import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const SitesView = props => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <div>Sites:</div>
    {props.sites.map(site => (
      <div key={site._id}>
        - <Link to={`site/${site._id}`}>{site.name}</Link>
      </div>
    ))}
  </div>
);

SitesView.propTypes = {
  sites: PropTypes.array.isRequired
};

export default SitesView;
