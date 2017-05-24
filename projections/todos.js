import Immutable from 'seamless-immutable'
import * as EventTypes from '../eventTypes'

export const initialStateTodo = {
  text: '',
  complete: false
}

export default {
  name: 'todos',

  initialState: Immutable({}),

  eventHandlers: {
    [EventTypes.CREATE_TODO]: (state, event) => state.set(event.aggregateId, {
      ...initialStateTodo,
      createdAt: event.timestamp,
      createdBy: event.payload.userId,
      id: event.aggregateId,
    }),
    [EventTypes.UPDATE_TODO]: (state, event) => state.setIn([event.aggregateId, event.payload.key], event.payload.value),
    [EventTypes.REMOVE_TODO]: (state, event) => state.without(event.aggregateId),
  }
};