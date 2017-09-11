import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import ModalConfirm from '../js/components/ModalConfirm';

describe('<ModalConfirm/>', () => {
  
	let wrapper

	let onConfirm
	let onCancel
	
	beforeEach(() => {
		onConfirm = sinon.spy()
		onCancel = sinon.spy()

		wrapper = mount(<ModalConfirm onConfirm={onConfirm} onCancel={onCancel} message="Testing Message" />)
	})

	it('Modal renders Confirm and Cancel buttons', () => {
		expect(wrapper.find('.button--confirm').length).to.equal(1)
		expect(wrapper.find('.button--cancel').length).to.equal(1)
	})

	it('Modal Confirm Button Click should invoke onConfirm callback in props', () => {
		wrapper.find('.button--confirm').at(0).simulate('click')
		expect(onConfirm.calledOnce).to.equal(true);
	})

	it('Modal Cancel Button Click should invoke onCancel callback in props', () => {
		wrapper.find('.button--cancel').at(0).simulate('click')
		expect(onCancel.calledOnce).to.equal(true);
	})

	it('Modal Window should contain given text within message prop.', () => {
		expect(wrapper.find('.container--message').first().text()).to.equal('Testing Message');
	})

});
