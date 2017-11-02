import React     from 'react'
import Modal     from 'react-modal'
import PropTypes from 'prop-types'

const FlagDeleteModal = props => (
  <Modal isOpen onRequestClose={props.onRequestClose}>
    <h1>{props.title}</h1>
    <p>
      Do you want to remove {props.site_flag.flag.type}({props.site_flag._id})
    </p>

    <form onSubmit={props.onSubmit}>
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

FlagDeleteModal.propTypes = {
  title          : PropTypes.string.isRequired,
  onSubmit       : PropTypes.func.isRequired,
  site_flag      : PropTypes.object.isRequired,
  onRequestClose : PropTypes.func.isRequired,
}

export default FlagDeleteModal
