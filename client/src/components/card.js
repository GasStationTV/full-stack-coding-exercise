import React     from 'react'
import Moment    from 'moment'
import PropTypes from 'prop-types'

import {
  date_format,
  modal_type_add,
  modal_type_edit,
  modal_type_remove
} from '../lib/constant'

const renderSiteFlags = ({site, onShowModal}) => (
  <div className='mt-2 site-flags'>
    <button
      className='btn btn-outline-info mb-2'
      onClick={onShowModal(modal_type_add)}
    >
      Add Flag
    </button>
    {
      site.site_flags.length > 0 ?
        <ul className='list-group fadeIn animated'>
          {
            site.site_flags.map(site_flag => (
              <li className='list-group-item' key={site_flag._id}>
                <p>
                  Type: {site_flag.flag.type}<br/>
                  Start date: {
                    site_flag.start_date ?
                      Moment(site_flag.start_date).format(date_format) : null
                  }<br/>
                  End date: {
                    site_flag.end_date ?
                      Moment(site_flag.end_date).format(date_format) : null
                  }<br/>
                </p>
                <div className='float-right'>
                  <button
                    type='button'
                    className='btn btn-outline-info mr-2'
                    onClick={onShowModal(modal_type_edit, site_flag)}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-outline-info'
                    onClick={onShowModal(modal_type_remove, site_flag)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          }
        </ul> : <p>There are no site flags</p>
    }
  </div>
)


class Card extends React.Component {
  constructor() {
    super()
    this.state = { show_flags: false }
  }

  onToggleFlag = () => this.setState({show_flags: !this.state.show_flags})

  render() {
    const { site, onShowModal } = this.props

    return (
        <div className='card border-info mb-3'>
          <div className='card-header'>
            Site ID: {site._id}
          </div>
          <div className='card-body'>
            <p>address: {site.address}</p>
            <p>city: {site.city}</p>
            <p>state: {site.state}</p>
            <button className='btn btn-info' onClick={this.onToggleFlag}>
              Toggle flag
            </button>
            {
              this.state.show_flags ? renderSiteFlags({
                site,
                onShowModal: onShowModal(site._id)
              }) : null
            }
          </div>
        </div>
    )
  }
}

Card.propTypes = {
  site        : PropTypes.object.isRequired,
  onShowModal : PropTypes.func.isRequired,
}

export default Card
