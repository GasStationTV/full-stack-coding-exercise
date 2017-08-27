import React from 'react';
import {Modal,Button,Form,FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
const FlagModal = ({openFlag,cancelFunc,saveFunc,container,addOrEditFlag,
  siteKey,site,handleChange,handleDateChange,flagsList}) => (
    <Modal
          show={openFlag}
          onHide={cancelFunc}
          container={container}
          aria-labelledby="contained-modal-title"
          bsSize="large"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title">{addOrEditFlag=="ADD"?<span>Add Flag</span>:<span>Edit Flag</span>}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form>
              <FormGroup controlId="formStartDate">
                <ControlLabel>Start Date</ControlLabel>
                <DayPicker
                  onDayClick={(day,modifiers,evt) => {handleDateChange(day,evt,siteKey,"startDate")}}
                  selectedDays={new Date(site.flags[site.editFlagIndex].startDate)}
                  name="startDate"
                />
              </FormGroup>
              <FormGroup controlId="formEndDate">
                <ControlLabel>End Date</ControlLabel>
                <DayPicker
                  onDayClick={(day,modifiers,evt) => {handleDateChange(day,evt,siteKey,"endDate")}}
                  selectedDays={new Date(site.flags[site.editFlagIndex].endDate)}
                />
              </FormGroup>

              <FormGroup controlId="formFlagType">
                <ControlLabel>Select Flag Type</ControlLabel>
                <FormControl componentClass="select" placeholder="select"
                  value={site.flags[site.editFlagIndex].flagType}
                  onChange={(evt) => {handleChange(evt,siteKey)}}
                  name="flagType">
                  <option>Select</option>
                  {flagsList.map((flagItem,fIndex)=>{
                    return <option value={flagItem} key={fIndex}>{flagItem}</option>
                  })}
                </FormControl>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { saveFunc(siteKey,addOrEditFlag) }}>Save</Button>
            <Button onClick={() => { cancelFunc(siteKey,addOrEditFlag) }}>Cancel</Button>
          </Modal.Footer>
        </Modal>
);

export default FlagModal;
