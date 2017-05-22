import React from 'react'
import App from './App'
import {shallow} from 'enzyme'

test('App must match snapshot', () => {
  const markup = shallow(
    <App>
      Test
    </App>
  )
  expect(markup).toMatchSnapshot()
})
