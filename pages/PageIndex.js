import React from 'react'
import AppBar from 'material-ui/AppBar'
import { withResolve } from '../resolve/packages/resolve-nextjs/src/index'
import withMaterialUI from '../withMaterialUI'
import App from '../containers/App'
import createStore from '../createStore'
import TodoList from '../containers/TodoList'

@withResolve(createStore)
@withMaterialUI
export default class PageIndex extends React.PureComponent {
  render() {
    return (
      <App>
        <AppBar
          title="TodoList"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <TodoList />
      </App>
    )
  }
}
