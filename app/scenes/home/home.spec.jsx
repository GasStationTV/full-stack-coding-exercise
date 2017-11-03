import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from 'redux-mock-store';
import Home from './';
import Flag from './components/flag';

describe('<Home/>', () => {
  const mockState = {
    HomeReducer: {
      flags: [
        {
          flagType: 'test1',
          startDate: 'today',
          endDate: 'tomorrow'
        },
        {
          flagType: 'test2',
          startDate: 'today',
          endDate: 'tomorrow'
        },
        {
          flagType: 'test3',
          startDate: 'today',
          endDate: 'tomorrow'
        }
      ],
      loading: false,
      error: null
    }
  };

  const mockStore = configureStore();
  const store = mockStore(mockState);
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      //<Provider store={store}>
        //<MuiThemeProvider>
          <Home store={store}/>
        //</MuiThemeProvider>
      //</Provider>
    );
  });

    it('should display a list of flags', () => {
        //expect(wrapper.find(Flag)).to.have.length(3);
    });
});
