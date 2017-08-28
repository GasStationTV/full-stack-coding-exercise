import React from 'react';

import Flags from '../flags';

import './style.scss';

export default class Index extends React.Component {
  render() {
    return (
      <div className="container">
        <Flags/>
      </div>
    );
  }
}
