import React from 'react';
import { Row,Col,ListGroup,ListGroupItem} from 'react-bootstrap';
import FlagsGrid from './FlagsGrid';
const Sites = ({sitesList,toggleFunc,modalCancelFunc,modalSaveFunc,openModalFunc,
  handleChange,handleDateChange,removeAlertFunc,handleAlertDismiss, removeConfirm
  ,flagsList}) => (
  <ListGroup>
    {Object.keys(sitesList).map((key, index)=>{
      return <ListGroupItem key={index}>
        <Row>
          <FlagsGrid site={sitesList[key]} toggleFunc={toggleFunc} siteKey={key}
          modalCancelFunc={modalCancelFunc} modalSaveFunc={modalSaveFunc}
          openModalFunc={openModalFunc} handleChange={handleChange}
          handleDateChange={handleDateChange} removeAlertFunc={removeAlertFunc}
          handleAlertDismiss={handleAlertDismiss} removeConfirm={removeConfirm}
          flagsList={flagsList}/>
        </Row>
      </ListGroupItem>
    })}
  </ListGroup>
)
export default Sites;
