import Card from '../../src/components/card'

const props = {
  site: {
    _id: 'abc',
    site_flags: [],
  },
  onShowModal: site_id => () => {}
}

const with_flags_props = {
  site: {
    _id: 'abc',
    site_flags: [
      {
        _id: '123',
        flag: { type: 'test-type' },
        start_date: new Date()
      }
    ],
  },
  onShowModal: site_id => () => {}
}

describe('components/card.js', () => {
  const wrapper = shallow(<Card {...props}/>)
  const wrapper_with_flags = shallow(<Card {...with_flags_props} />)

  it('expect to not show site flags', () => {
    expect(wrapper.find('.site-flags').length).to.equal(0)
  })

  it('expect to show no site flags message', () => {
    const expected = 'There are no site flags'

    wrapper.find('button.btn-info').simulate('click')
    expect(wrapper.find('.site-flags p').text()).to.equal(expected)
  })

  it('expect to show a list of site flags', () => {
    wrapper_with_flags.find('button.btn-info').simulate('click')
    expect(wrapper_with_flags.find('.site-flags').length).to.equal(1)
  })
})
