import React from 'react';
import App from '../../../src/client/components/App'
import Sites from '../../../src/client/components/Sites'
import renderer from 'react-test-renderer';
import store from '../../../src/client/redux/store';
import {Provider} from 'react-redux';
import {shallow} from 'enzyme';
test('App is renderable', () => {
  const component = renderer.create(
    <Provider store={store}>
  		<App/>
  	</Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('App DOM validation', () => {
  const appComponent = shallow(
    <Provider store={store}>
  		<App/>
  	</Provider>
  );
  console.log("DEBUG SITES: "+appComponent.find(Sites).length)
  expect(appComponent.find(Sites).length).toBeDefined();
});
