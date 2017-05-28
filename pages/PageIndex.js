import React from 'react'
import { withResolve } from '../resolve/packages/resolve-nextjs/src/index'
import App from '../containers/App'
import createStore from '../createStore'
import TodoList from '../containers/TodoList'

const PageIndex = () => (
  <App>
    <TodoList />
  </App>
)

export default withResolve(createStore)(PageIndex)
