import uuidV4 from 'uuid/v4'
import * as ActionTypes from '../eventTypes'
import * as TodoActions from './todoActions'
import * as CommandTypes from '../commandTypes'
import {actions as ResolveActions} from '../resolve/packages/resolve-redux/src/index'

const aggregateName = 'todos'

describe('RecipeActions. ', () => {
  describe('createRecipe', () => {
    it('should create an action to create a recipe', () => {
      const aggregateId = uuidV4()
      expect(TodoActions.removeTodo(aggregateId)).toEqual(ResolveActions.sendCommand({
        command: {
          type: CommandTypes.REMOVE
        },
        payload: {},
        aggregateId,
        aggregateName
      }))
    })
  })

})
