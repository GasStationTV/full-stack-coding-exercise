import FlagDeleteModal from '../../../src/components/shared-components/flag-delete-modal'

const props = {
  title: 'testing',
  site_flag: {
    flag: {
      type: 'test-type',
      _id: 'cba',
    },
    _id: 'abc'
  },
  onRequestClose: () => {},
  onSubmit: () => {}
}


describe('components/shared-components/flag-delete-modal.js', () => {
  const wrapper = shallow(<FlagDeleteModal {...props}/>)

  it('expect to display a title', () => {
    expect(wrapper.find('h1').text()).to.equal(props.title)
  })

  it('expect to display confirm text with flag type and site flag _id', () => {
    const expected = `Do you want to remove ${props.site_flag.flag.type}(${props.site_flag._id})`

    expect(wrapper.find('p').text()).to.equal(expected)
  })
})
