import React      from 'react'
import Modal      from 'react-modal'
import Select     from 'react-select'
import DatePicker from 'react-datepicker'
import PropTypes  from 'prop-types'
import Moment     from 'moment'

const FlagModal = props => (
  <Modal isOpen onRequestClose={props.onRequestClose}>
    <h1>{props.title}</h1>
    <form onSubmit={props.onSubmit}>
      {
        props.err_msg ?
          <div className='alert alert-danger'>
            {props.err_msg}
          </div> : null
      }
      <Select
        name='flag-type'
        value={props.form.flag_id}
        options={props.flag_options}
        onChange={props.onSelectFlag}
        placeholder='*Flag type'
        className='mb-2'
      />
      <div className='form-row mb-2'>
        <div className='col'>
          <DatePicker
            className='form-control'
            placeholderText='Start date'
            selected={props.form.start_date}
            onChange={props.onPickDate('start_date')}
            // maxDate={
            //   props.form.end_date ?
            //   Moment(props.form.end_date).subtract(1, 'day') : null
            // }
          />
        </div>
        <div className='col'>
          <DatePicker
            className='form-control'
            placeholderText='End date'
            selected={props.form.end_date}
            onChange={props.onPickDate('end_date')}
            minDate={
              props.form.start_date ?
                props.form.start_date.diff(Moment(), 'days') >= 0 ?
                  Moment(props.form.start_date).add(1, 'day') : Moment()
                : null
            }
          />
        </div>
      </div>
      <div className='float-right'>
        <button
          type='button'
          className='btn btn-dark mr-2'
          onClick={props.onRequestClose}
        >
          Close
        </button>

        <button
          type='submit'
          className='btn btn-info'
        >
          Submit
        </button>
      </div>
    </form>
  </Modal>
)

FlagModal.propTypes = {
  title          : PropTypes.string.isRequired,
  onSubmit       : PropTypes.func.isRequired,
  onRequestClose : PropTypes.func.isRequired,
  form           : PropTypes.object.isRequired,
  onPickDate     : PropTypes.func.isRequired,
  onSelectFlag   : PropTypes.func.isRequired,
  flag_options   : PropTypes.arrayOf(PropTypes.object).isRequired,
  err_msg        : PropTypes.string
}

export default FlagModal
