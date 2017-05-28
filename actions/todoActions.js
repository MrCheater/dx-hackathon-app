import { actions as ResolveActions } from 'resolve-redux'
import uuidV4 from 'uuid/v4'
import * as CommandTypes from '../commandTypes'

const aggregateName = 'todos'

export const createTodo = () =>
  ResolveActions.sendCommand({
    command: {
      type: CommandTypes.CREATE
    },
    payload: {},
    aggregateId: uuidV4(),
    aggregateName
  })

export const removeTodo = aggregateId =>
  ResolveActions.sendCommand({
    command: {
      type: CommandTypes.REMOVE
    },
    payload: {},
    aggregateId,
    aggregateName
  })

export const updateTodo = (aggregateId, text) =>
  ResolveActions.sendCommand({
    command: {
      type: CommandTypes.UPDATE
    },
    payload: {
      text
    },
    aggregateId,
    aggregateName
  })
