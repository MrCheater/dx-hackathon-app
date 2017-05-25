import React from 'react'
import { withResolve } from '../resolve/packages/resolve-nextjs/src/index'
import App from '../containers/App'
import createStore from '../createStore'
import { connect } from 'react-redux'
import TodoItem from '../containers/TodoItem'
import routes from '../routes';
const { Link } = routes;

const PageIndex = (props) => (
  <App>
    <Link route="PageIndex">
      <a>
        Back
      </a>
    </Link>
    <TodoItem {...props}/>
  </App>
)

const mapStateToProps = (state, ownProps) => (state.todos[ownProps.url.query.id])

export default withResolve(createStore)(connect(mapStateToProps)(PageIndex))
