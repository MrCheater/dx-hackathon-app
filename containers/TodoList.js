import React from 'react'
import { bindActionCreators } from 'redux'
import { connectAdvanced } from 'react-redux'
import shallowEqual from 'react-pure-render/shallowEqual'
import TodoItem from './TodoItem'
import * as TodoActions from '../actions/todoActions'
import RaisedButton from 'material-ui/RaisedButton'

export const TodoList = ({ todos, createTodo }) => (
  <div className="root">
    {Object.values(todos).map(props => <TodoItem key={props.id} {...props} />)}
    <RaisedButton label="Create Todo" secondary onTouchTap={createTodo} />
  </div>
)

export function selectorFactory(dispatch) {
  let state = {}
  let props = {}
  let result = {}
  const actions = bindActionCreators(TodoActions, dispatch)
  return (nextState, nextProps) => {
    const todos = nextState.todos
    const nextResult = { ...nextProps, todos, ...actions }
    state = nextState
    props = nextProps
    if (!shallowEqual(result, nextResult)) {
      result = nextResult
    }
    return result
  }
}

export default connectAdvanced(selectorFactory)(TodoList)
