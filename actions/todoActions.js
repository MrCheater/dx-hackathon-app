import * as ActionTypes from '../eventTypes'
import * as CommandTypes from '../commandTypes'

const aggregateName = 'recipes'

export function createTodo(aggregateId) {
  return {
    type: ActionTypes.CREATE_TODO,
    aggregateId,
    aggregateName,
    command: {
      type: CommandTypes.CREATE,
    },
  }
}

export function removeTodo(aggregateId) {
  return {
    type: ActionTypes.REMOVE_TODO,
    aggregateId,
    aggregateName,
    command: {
      type: CommandTypes.REMOVE,
    },
  }
}

export function updateTodo(aggregateId, key, value) {
  return {
    type: ActionTypes.UPDATE_TODO,
    aggregateId,
    aggregateName,
    payload: {
      key,
      value,
    },
    command: {
      type: CommandTypes.UPDATE,
    },
  }
}