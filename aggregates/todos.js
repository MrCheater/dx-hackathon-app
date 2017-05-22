import tcomb from 'tcomb'
import Immutable from 'seamless-immutable'
import * as EventTypes from '../eventTypes'
import * as CommandTypes from '../commandTypes'
import checkAggregateExists from './checkAggregateExists'
import checkEditPermission from './checkEditPermission'
import checkAggregateNotExists from './checkAggregateNotExists'

export default {
  name: 'todos',

  initialState: () => Immutable({created: false}),

  eventHandlers: {
    [EventTypes.CREATE_TODO]: (state, event) => state.merge({
      created: true,
      createdBy: event.payload.userId,
    })
  },

  commands: {
    [CommandTypes.CREATE](state, command) {
      tcomb.struct({
        userId: tcomb.String,
      })(command.payload)

      checkAggregateNotExists(state, command)

      return {
        type: EventTypes.CREATE_TODO,
        payload: command.payload
      }
    },

    [CommandTypes.REMOVE](state, command) {
      tcomb.struct({
        userId: tcomb.String,
      })(command.payload)

      checkAggregateExists(state, command)
      checkEditPermission(state, command)

      return {
        type: EventTypes.REMOVE_TODO,
        payload: command.payload
      }
    },

    [CommandTypes.UPDATE](state, command) {
      tcomb.struct({
        key: tcomb.String,
        value: tcomb.union([tcomb.String, tcomb.Boolean, tcomb.Number]),
        userId: tcomb.String,
      })(command.payload)

      checkAggregateExists(state, command)
      checkEditPermission(state, command)

      return {
        type: EventTypes.UPDATE_TODO,
        payload: command.payload
      }
    },
  },
}