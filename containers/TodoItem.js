import React from 'react'
import { bindActionCreators } from 'redux'
import { connectAdvanced } from 'react-redux'
import shallowEqual from 'react-pure-render/shallowEqual'
import * as TodoActions from '../actions/todoActions'
import Input from '../components/Input'
import routes from '../routes'
const { Link } = routes

const TodoItem = ({ id, remove, update, text, complete, createdBy } = {}) =>
  id
    ? <div className="root">
        <div className="cell">
          <Input value={text} onChange={update} />
        </div>
        <div className="cell">
          <div className="remove-button" onClick={remove}>
            (X)
          </div>
        </div>
        <Link route="PageTodo" params={{ id }}>
          <a className="cell">
            (id: {id})
          </a>
        </Link>
        <a className="cell">
          [{createdBy}]
        </a>
        <style jsx>{`
      .root {
        display: table;
      }
      .cell {
        display: table-cell;
      }
      .remove-button {
        padding: 0 8px;
        cursor: pointer;
        color: red;
        font-weight: bold;
      }
    `}</style>
      </div>
    : null

export function selectorFactory(dispatch) {
  let state = {}
  let props = {}
  let result = {}
  const actions = bindActionCreators(
    {
      remove: () => TodoActions.removeTodo(props.id),
      update: event => TodoActions.updateTodo(props.id, event.target.value)
    },
    dispatch
  )
  return (nextState, nextProps) => {
    const nextResult = { ...nextProps, ...actions }
    state = nextState
    props = nextProps
    if (!shallowEqual(result, nextResult)) {
      result = nextResult
    }
    return result
  }
}

export default connectAdvanced(selectorFactory)(TodoItem)
