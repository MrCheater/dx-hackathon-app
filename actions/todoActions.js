import * as CommandTypes from '../commandTypes'
import {actions as ResolveActions} from '../resolve/packages/resolve-redux/src/index'

const aggregateName = 'recipes'

export const createTodo = (aggregateId) => ResolveActions.sendCommand({
  command: {
    type: CommandTypes.CREATE
  },
  payload: {},
  aggregateId,
  aggregateName
})

export const removeTodo = (aggregateId) => ResolveActions.sendCommand({
  command: {
    type: CommandTypes.REMOVE
  },
  payload: {},
  aggregateId,
  aggregateName
})

export const updateTodo = (aggregateId, text) => ResolveActions.sendCommand({
  command: {
    type: CommandTypes.UPDATE,
  },
  payload: {
    text,
  },
  aggregateId,
  aggregateName,
})