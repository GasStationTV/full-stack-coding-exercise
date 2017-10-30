import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Home from './';
import Flag from './components/flag';

describe('<Home/>', () => {
    it('should display a list of flags', () => {
        const wrapper = shallow(<Home />);
        ///expect(wrapper.find(Table)).to.have.length(1);
    });
});
