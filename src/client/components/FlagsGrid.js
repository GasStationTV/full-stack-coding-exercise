import React from 'react';
import { Row,Col,Panel,Glyphicon,Button,Alert} from 'react-bootstrap';
import Flag from './Flag'
import FlagModal from './FlagModal'
import PropTypes from 'prop-types';

const FlagsGrid = ({site,toggleFunc,siteKey,modalCancelFunc,modalSaveFunc,
  openModalFunc,handleChange,handleDateChange,removeAlertFunc,handleAlertDismiss
  ,removeConfirm, flagsList}) => (
  <Panel className="modal-container" bsStyle="primary">
        <div className="well well-sm" >
          <Row>
            <Col sm={3} md={3} lg={3}>{site.name}</Col>
            <Col sm={3} md={3} lg={3}>{site.address}</Col>
            <Col sm={3} md={3} lg={3}>
                {site.flags.length>0 ? <Button bsStyle="info" onClick={() => { toggleFunc(siteKey) }}>Show Flags</Button> : <span className="label label-warning">There are no site flags.</span>}
            </Col>
            <Col sm={3} md={3} lg={3}><Button bsStyle="info" onClick={() => { openModalFunc(siteKey,"ADD",-1) }}>Add Flag</Button></Col>
            {site.openModalFlag?
                <FlagModal openFlag={site.openModalFlag} cancelFunc={modalCancelFunc}
                 saveFunc={modalSaveFunc} container={this} addOrEditFlag={site.mode}
                 siteKey={siteKey} site={site} handleChange={handleChange}
                 handleDateChange={handleDateChange} flagsList={flagsList}/>
                :null
            }

          </Row>
        </div>
        {site.error?
            <Alert bsStyle="danger">
              <h4>Error: {site.error}</h4>
            </Alert>:null
        }
        {site.removeAlertFlag?
            <Alert bsStyle="warning" onDismiss={() => { handleAlertDismiss(siteKey) }}>
              <h4>Do you want to remove Flag: {site.flags[site.removeFlagIndex].flagType}?</h4>
                <p>
                  <Button bsStyle="danger" onClick={() => { removeConfirm(siteKey) }}>Remove</Button>
                  <span> or </span>
                  <Button onClick={() => { handleAlertDismiss(siteKey) }}>Cancel</Button>
                </p>
            </Alert>:null
        }
      {site.openFlag?
        <div>
            {
              site.flags.map((flag,index)=>{
                return <Col sm={12} md={2} lg={2} key={index}>
                          <Flag flag={flag} openModalFunc={openModalFunc} flagIndex={index} siteKey={siteKey} removeAlertFunc={removeAlertFunc}/>
                        </Col>
              })
            }
        </div>:null
      }

    </Panel>
)
FlagsGrid.propTypes = {
  site: PropTypes.object,
  toggleFunc:PropTypes.func,
  siteKey:PropTypes.string,
  modalCancelFunc:PropTypes.func,
  modalSaveFunc:PropTypes.func,
  openModalFunc:PropTypes.func,
  handleChange:PropTypes.func,
  handleDateChange:PropTypes.func,
  removeAlertFunc:PropTypes.func,
  handleAlertDismiss:PropTypes.func,
  removeConfirm:PropTypes.func,
  flagsList:PropTypes.array
};
export default FlagsGrid;
