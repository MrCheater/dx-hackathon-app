import todos from './todos'
import * as EventTypes from '../eventTypes'
import * as CommandTypes from '../commandTypes'
import uuidV4 from 'uuid/v4'

describe('todos aggregate', () => {
  describe('CREATE', () => {
    it('should return an event to create a todo', () => {
      const userId = uuidV4()
      const state = {
        created: false,
      }

      const command = {
        payload: {
          userId
        }
      }

      const event = todos.commands[CommandTypes.CREATE](
        state,
        command
      )

      expect(event).toEqual({
        type: EventTypes.CREATE_TODO,
        payload: command.payload
      })
    })

    it('should throw error "Aggregate already exists"', () => {
      const userId = uuidV4()
      const state = {
        created: true,
      }

      const command = {
        payload: {
          userId
        }
      }

      expect(() =>
        todos.commands[CommandTypes.CREATE](
          state,
          command
        )).toThrow(/Aggregate already exists/)
    })

    it('should throw error "Validation Error"', () => {
      const state = {
        created: false,
      }

      const command = {
        payload: {
        }
      }

      expect(() =>
        todos.commands[CommandTypes.CREATE](
          state,
          command
        )).toThrow(/tcomb/)
    })
  })

  describe('REMOVE', () => {
    it('should return an event to remove the todo', () => {
      const userId = uuidV4()
      const state = {
        created: true,
        createdBy: userId,
      }

      const command = {
        payload: {
          userId,
        }
      }

      const event = todos.commands[CommandTypes.REMOVE](state, command)

      expect(event).toEqual({
        type: EventTypes.REMOVE_TODO,
        payload: command.payload
      })
    })

    it('should throw error "Aggregate not found"', () => {
      const userId = uuidV4()
      const state = {
        created: false,
        createdBy: userId,
      }

      const command = {
        payload: {
          userId,
        }
      }

      expect(() => todos.commands[CommandTypes.REMOVE](state, command)).toThrow(
        /Aggregate not found/,
      )
    })

    it('should throw error "Permission denied"', () => {
      const userId = uuidV4()
      const state = {
        created: true,
        createdBy: userId,
      }

      const command = {
        payload: {
          userId: uuidV4(),
        }
      }

      expect(() => todos.commands[CommandTypes.REMOVE](state, command)).toThrow(
        /Permission denied/,
      )
    })
  })

  describe('UPDATE', () => {
    it('should return an event to update the todo', () => {
      const userId = uuidV4()
      const state = {
        created: true,
        createdBy: userId,
      }

      const command = {
        payload: {
          key: 'amount',
          value: 100,
          userId,
        }
      }

      const event = todos.commands[CommandTypes.UPDATE](state, command)

      expect(event).toEqual({
        type: EventTypes.UPDATE_TODO,
        payload: command.payload
      })
    })

    it('should throw error "Aggregate not found"', () => {
      const userId = uuidV4()
      const state = {
        created: false,
        createdBy: userId,
      }

      const command = {
        payload: {
          key: 'amount',
          value: 100,
          userId,
        }
      }

      expect(() => todos.commands[CommandTypes.UPDATE](state, command)).toThrow(
        /Aggregate not found/,
      )
    })

    it('should throw error "Validation Error"', () => {
      const userId = uuidV4()
      const state = {
        createdBy: userId,
      }
      const command = {
        payload: {
          userId,
        }
      }

      expect(() => todos.commands[CommandTypes.UPDATE](state, command)).toThrow(
        /tcomb/,
      )
    })

    it('should throw error "Permission denied"', () => {
      const userId = uuidV4()
      const state = {
        created: true,
        createdBy: userId,
      }

      const command = {
        payload: {
          key: 'amount',
          value: 100,
          userId: uuidV4(),
        }
      }

      expect(() => todos.commands[CommandTypes.UPDATE](state, command)).toThrow(
        /Permission denied/,
      )
    })
  })
})
