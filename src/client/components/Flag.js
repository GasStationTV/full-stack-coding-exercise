import React from 'react';
import { Panel,Row,Col,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Flag = ({flag,openModalFunc,flagIndex,siteKey,removeAlertFunc}) => (
  <Panel>
  	<Row>Flag Type: {flag.flagType}</Row>
  	<Row>Start Date: {flag.startDate}</Row>
  	<Row>End Date: {flag.endDate}</Row>
    <Row>
      <Col sm={6} md={6} lg={6}><Button bsStyle="info" bsSize="small" onClick={() => { openModalFunc(siteKey,"EDIT",flagIndex) }}>Edit</Button></Col>
      <Col sm={6} md={6} lg={6}><Button bsStyle="danger" bsSize="small" onClick={() => { removeAlertFunc(siteKey,flagIndex) }}>Remove</Button></Col>
    </Row>
  </Panel>
);
Flag.propTypes = {
  flag: PropTypes.object,
  openModalFunc:PropTypes.func,
  flagIndex:PropTypes.number,
  siteKey:PropTypes.string,
  removeAlertFunc:PropTypes.func
};
export default Flag;
