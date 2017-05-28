import todos from './todos'
import * as EventTypes from '../eventTypes'
import * as CommandTypes from '../commandTypes'
import uuidV4 from 'uuid/v4'

describe('todos aggregate', () => {
  describe('CREATE', () => {
    it('should return an event to create a todo', () => {
      const user = uuidV4()
      const state = {
        created: false
      }

      const command = {
        payload: {
          user
        }
      }

      const event = todos.commands[CommandTypes.CREATE](state, command)

      expect(event).toEqual({
        type: EventTypes.CREATE_TODO,
        payload: command.payload
      })
    })

    it('should throw error "Aggregate already exists"', () => {
      const user = uuidV4()
      const state = {
        created: true
      }

      const command = {
        payload: {
          user
        }
      }

      expect(() => todos.commands[CommandTypes.CREATE](state, command)).toThrow(
        /Aggregate already exists/
      )
    })

    it('should throw error "Validation Error"', () => {
      const state = {
        created: false
      }

      const command = {
        payload: {}
      }

      expect(() => todos.commands[CommandTypes.CREATE](state, command)).toThrow(
        /tcomb/
      )
    })
  })
})
