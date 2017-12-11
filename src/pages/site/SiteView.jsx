import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from 'material-ui/Paper';
import Clear from 'material-ui/svg-icons/content/clear';
import Edit from 'material-ui/svg-icons/content/create';
import FlagModal from './FlagModal';
import ConfirmModal from './ConfirmModal';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import utils from '../../utils';

class SiteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      currentFlag: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.removeFlag = this.removeFlag.bind(this);
  }

  get filteredFlags() {
    return this.props.flags.filter(flag => {
      const start = flag.startDate;
      const end = flag.endDate;
      if (!end) {
        return true;
      }
      if (start) {
        if (new Date(start).toLocaleString() === new Date().toLocaleString()) {
          return false;
        }
      }
      if (start && end) {
        if (moment(start).isBefore(moment()) && moment(end).isAfter(moment())) {
          return true;
        }
        if (moment(start).isAfter(moment()) && moment(end).isAfter(moment())) {
          return true;
        }
      }
      return false;
    });
  }

  get initialFormValues() {
    const { type, startDate, endDate } = this.state.currentFlag;
    return {
      type,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null
    };
  }

  closeModal(modal) {
    this.setState({
      [modal]: false,
      currentFlag: {}
    });
  }

  openModal(modal, flag = {}) {
    this.setState({
      [modal]: true,
      currentFlag: flag
    });
  }

  onSubmit(newFlag) {
    this.props.updateSite(newFlag);
    this.closeModal('flagModalOpen');
  }

  removeFlag(id) {
    this.props.removeFlag(id);
    this.closeModal('confirmModalOpen');
  }

  render() {
    const { flags, site } = this.props;
    return (
      <div>
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <div style={{ marginBottom: '15px' }}>Site Name: {site.name}</div>
          <RaisedButton
            onClick={() => this.openModal('flagModalOpen')}
            style={{ padding: '0 10px' }}
          >
            Add New Flag
          </RaisedButton>
        </div>
        <ConfirmModal
          isOpen={this.state.confirmModalOpen}
          flag={this.state.currentFlag}
          onConfirm={this.removeFlag}
          onCancel={() => this.closeModal('confirmModalOpen')}
        />
        <FlagModal
          isOpen={this.state.flagModalOpen}
          flag={this.state.currentFlag}
          closeModal={() => this.closeModal('flagModalOpen')}
          onSubmit={this.onSubmit}
          initialValues={this.initialFormValues}
        />
        {flags && this.filteredFlags.length > 0 ? (
          <Paper
            zDepth={1}
            style={{ padding: '20px 0 5px 0', marginTop: '30px' }}
          >
            <Grid fluid>
              <Row style={{ paddingLeft: '10px' }}>
                <Col xs={4} md={4} lg={4} style={{ textAlign: 'left' }}>
                  <span>Flag Type</span>
                </Col>
                <Col xs={3} md={3} lg={3}>
                  <span>Start Date</span>
                </Col>
                <Col xs={3} md={3} lg={3}>
                  <span>End Date</span>
                </Col>
                <Col xs={1} md={1} lg={1}>
                  <span>Edit</span>
                </Col>
                <Col xs={1} md={1} lg={1}>
                  <span>Remove</span>
                </Col>
              </Row>
              <Divider />
              <List>
                {this.filteredFlags.map((flag, index) => (
                  <Row
                    key={flag._id}
                    style={{
                      padding: '5px 0 5px 10px',
                      background: utils.isOdd(index)
                        ? 'rgba(220,220,220,.5)'
                        : 'none'
                    }}
                  >
                    <Col xs={4} md={4} lg={4} style={{ textAlign: 'left' }}>
                      <span>{flag.type}</span>
                    </Col>
                    <Col xs={3} md={3} lg={3}>
                      <span>{utils.formatDate(flag.startDate)}</span>
                    </Col>
                    <Col xs={3} md={3} lg={3}>
                      <span>{utils.formatDate(flag.endDate)}</span>
                    </Col>
                    <Col xs={1} md={1} lg={1}>
                      <Edit
                        color="darkgray"
                        hoverColor="black"
                        style={{
                          cursor: 'pointer',
                          display: 'inline-block',
                          width: '20px',
                          height: '20px'
                        }}
                        onClick={() => this.openModal('flagModalOpen', flag)}
                      />
                    </Col>
                    <Col xs={1} md={1} lg={1}>
                      <Clear
                        color="darkgray"
                        hoverColor="black"
                        onClick={() => this.openModal('confirmModalOpen', flag)}
                        style={{
                          cursor: 'pointer',
                          display: 'inline-block',
                          width: '20px',
                          height: '20px'
                        }}
                      />
                    </Col>
                  </Row>
                ))}
              </List>
            </Grid>
          </Paper>
        ) : (
          <div style={{ paddingTop: '15px', textAlign: 'center' }}>
            This site has no flags. Add one above!
          </div>
        )}
      </div>
    );
  }
}

SiteView.propTypes = {
  site: PropTypes.object,
  flags: PropTypes.array,
  removeFlag: PropTypes.func
};

export default SiteView;
