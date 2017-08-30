import React from 'react';
import Navigation from '../../../src/client/components/Navigation'
import renderer from 'react-test-renderer';

test('Navigation is renderable', () => {
  const component = renderer.create(
    <Navigation/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
