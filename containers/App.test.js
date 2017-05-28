import React from 'react'
import App from './App'
import { shallow } from 'enzyme'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

test('App must match snapshot', () => {
  const markup = shallow(
    <Provider store={createStore((state = {}) => state)}>
      <App isLogged={true}>
        Test
      </App>
    </Provider>
  )
  expect(markup).toMatchSnapshot()
})
