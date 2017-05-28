import React from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { withResolve } from '../resolve/packages/resolve-nextjs/src/index'
import withMaterialUI from '../withMaterialUI'
import App from '../containers/App'
import createStore from '../createStore'
import TodoItem from '../containers/TodoItem'
import routes from '../routes'
const { Router } = routes

@withResolve(createStore)
@withMaterialUI
@connect(mapStateToProps)
export default class PageTodo extends React.PureComponent {
  onLeftIconButtonTouchTap = () => {
    Router.pushRoute('PageIndex')
  };

  render() {
    return (
      <App>
        <AppBar
          title={`TodoList / TodoItem (id: "${this.props.id}")`}
          iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
          onLeftIconButtonTouchTap={this.onLeftIconButtonTouchTap}
        />
        <TodoItem {...this.props} />
      </App>
    )
  }
}

export function mapStateToProps(state, ownProps) {
  return state.todos[ownProps.url.query.id]
}
