import FlagModal from '../../../src/components/shared-components/flag-modal'

const props = {
  title: 'testing',
  onSubmit: () => {},
  onRequestClose: () => {},
  form: {},
  onPickDate: () => {},
  onSelectFlag: () => {},
  flag_options: [{}],
  err_msg: 'error message'
}

describe('components/shared-components/flag-modal.js', () => {
  const wrapper = shallow(<FlagModal {...props}/>)

  it('it should has display error message', () => {
    expect(wrapper.find('.alert').length).to.equal(1)
    expect(wrapper.find('.alert').text()).to.equal(props.err_msg)
  })

})
