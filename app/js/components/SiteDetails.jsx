import React, { Component } from 'react';

export default (props) => {

  // const siteObj = getSite(parseInt(props.match.params.id))
  const siteObj = {}

  if (!siteObj) {
    return <div>Sorry, the site does not exist.</div>
  }
  return (
    <div>
      <h1>Site Details #{props.match.params.id}</h1>
      <div>Details</div>
    </div>
  )
}
