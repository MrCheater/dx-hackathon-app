import React from 'react'
import withResolve from '../resolve/packages/resolve-nextjs/withResolve'
import App from '../components/App'
import createStore from '../createStore'
import TodoList from '../containers/TodoList'

const PageIndex = () => (
  <App>
    <TodoList/>
  </App>
)

export default withResolve(createStore)(PageIndex)
