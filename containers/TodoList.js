import React from 'react'
import { bindActionCreators } from 'redux'
import { connectAdvanced } from 'react-redux'
import TodoItem from '../components/TodoItem'
import todoActions from '../actions/todoActions'

export const TodoList = ({ todos, addTodo }) => (
  <div className = 'root'>
    {todos.map(
      ({ remove, update, text, complete }) => (
        <TodoItem
          remove = {remove}
          update = {update}
          complete = {complete}
          text = {text}
        />
      )
    )}
    <style jsx>{`
      .root {
        color: red;
      }
    `}</style>
  </div>
)

export function selectorFactory(dispatch) {
  let ownProps = {}
  let result = {}
  const actions = bindActionCreators({

  }, dispatch)
  const addTodo = (text) => actions.addTodo(ownProps.userId, text)
  return (nextState, nextOwnProps) => {
    const todos = nextState.todos[nextProps.userId]
    const nextResult = { ...nextOwnProps, todos, addTodo }
    ownProps = nextOwnProps
    if (!shallowEqual(result, nextResult)) result = nextResult
    return result
  }
}

export default connectAdvanced(selectorFactory)(TodoList)