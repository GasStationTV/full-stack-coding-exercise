import * as R      from 'ramda'
import React       from 'react'
import { connect } from 'react-redux'
import Moment      from 'moment'

import Action          from './actions'
import Card            from './components/card.js'
import FlagModal       from './components/shared-components/flag-modal'
import FlagDeleteModal from './components/shared-components/flag-delete-modal'
import {
  modal_type_add,
  modal_type_edit,
  modal_type_remove
}  from './lib/constant'

const DEFAULT_STATE = {
  modal_type         : '',
  err_msg            : '',
  selected_site_id   : '',
  form               : {},
  selected_site_flag : {},
}

class App extends React.Component {
  constructor() {
    super()
    this.state = DEFAULT_STATE
  }

  componentDidMount() {
    this.props.getSites()
    this.props.getFlagTypes()
  }

  onSelectFlag = flag => this.setState(prevState => ({
    form: R.merge(this.state.form, {flag_id: flag.value})
  }))

  onPickDate = type => date => this.setState(prevState => ({
    form: R.merge(prevState.form, {[type]: date})
  }))

  resetState = () => this.setState(DEFAULT_STATE)

  onSubmit = event => {
    event.preventDefault()

    if (!this.state.form.flag_id) {
      this.setState({err_msg: 'Flag type is required'})
      return
    }

    if (this.state.form.end_date && this.state.form.start_date) {
      const {start_date, end_date} = this.state.form

      if (start_date.diff(end_date, 'days') === 0) {
        this.setState({err_msg: 'Unable to Create/Update: The start date must be before the end date'})
        return
      }

      if (start_date.diff(end_date, 'days') > 0) {
        this.setState({err_msg: 'Unable to Create/Update: The start date must be before the end date'})
        return
      }
    }

    if (this.state.modal_type === modal_type_add) {
      this.props.addFlag(this.state.selected_site_id, this.state.form)
      this.resetState()
    }

    if (this.state.modal_type === modal_type_remove) {
      this.props.removeSiteFlag(
        this.state.selected_site_id,
        this.state.selected_site_flag._id
      )
      this.resetState()
    }

    if (this.state.modal_type === modal_type_edit) {
      this.props.updateSiteFlag(
        this.state.selected_site_id,
        this.state.selected_site_flag._id,
        this.state.form
      )
      this.resetState()
    }
  }

  onShowModal = selected_site_id => (modal_type, selected_site_flag) => () => {
    let new_state = {
      selected_site_id, modal_type,
      show_modal: true
    }

    if (selected_site_flag) {
      const { start_date, end_date } = selected_site_flag
      new_state.selected_site_flag = selected_site_flag
      new_state.form = {
        flag_id: selected_site_flag.flag._id,
        start_date: start_date ? Moment(start_date) : null,
        end_date: end_date ? Moment(end_date) : null,
      }
    }

    this.setState(new_state)
  }

  render() {
    const { sites, flags } = this.props
    const { show_modal, modal_type, err_msg, form } = this.state

    return (
      <div className='container-fluid'>
        {
          sites.length > 0 ?
            sites.map(site => (
              <Card
                site={site}
                key={site._id}
                onShowModal={this.onShowModal}
              />
            )) : <p>Loading ...</p>
        }
        {
          (
            show_modal &&
            (modal_type === modal_type_add || modal_type === modal_type_edit)
          ) ? FlagModal({
            err_msg,
            form,
            flag_options: flags,
            onSelectFlag: this.onSelectFlag,
            onPickDate: this.onPickDate,
            onSubmit: this.onSubmit,
            onRequestClose: this.resetState,
            title: modal_type === modal_type_add ? 'Add flag' : 'Edit flag',
          }) : null
        }
        {
          show_modal && modal_type === modal_type_remove ?
            FlagDeleteModal({
              onSubmit: this.onSubmit,
              site_id: this.state.selected_site_id,
              onRequestClose: this.resetState,
              site_flag: this.state.selected_site_flag,
              title: 'Delete site flag'
            }) : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sites: state.sites,
  flags: R.map(flag => ({value: flag._id, label: flag.type}))(state.flags)
})

const mapDispatchToProps = dispatch => ({
  getSites: () => dispatch(Action.site.getAll()),
  getFlagTypes: () => dispatch(Action.flag.getAll()),
  addFlag: (site_id, request) => dispatch(
    Action.site.addFlag(site_id, request)
  ),
  removeSiteFlag: (site_id, site_flag_id) => dispatch(
    Action.site.removeFlag(site_id, site_flag_id)
  ),
  updateSiteFlag: (site_id, site_flag_id, request) => dispatch(
    Action.site.updateFlag(site_id, site_flag_id, request)
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
