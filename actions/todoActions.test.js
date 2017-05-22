import * as ActionTypes from '../eventTypes'
import * as RecipeActions from './recipeActions'
import * as CommandTypes from '../commandTypes'
import uuidV4 from 'uuid/v4'

const aggregateName = 'recipes'

describe('RecipeActions. ', () => {
  describe('createRecipe', () => {
    it('should create an action to create a recipe', () => {
      const aggregateId = uuidV4()
      expect(RecipeActions.createRecipe(aggregateId)).toEqual({
        type: ActionTypes.CREATE_RECIPE,
        aggregateId,
        aggregateName,
        command: {
          type: CommandTypes.CREATE,
        },
      })
    })
  })

  describe('removeRecipe', () => {
    it('should create an action to remove the recipe', () => {
      const aggregateId = uuidV4()
      expect(RecipeActions.removeRecipe(aggregateId)).toEqual({
        type: ActionTypes.REMOVE_RECIPE,
        aggregateId,
        aggregateName,
        command: {
          type: CommandTypes.REMOVE,
        },
      })
    })
  })

  describe('updateRecipe', () => {
    it('should create an action to update the recipe', () => {
      const aggregateId = uuidV4()
      const key = 'name'
      const value = 'Demo Recipe Name ' + Math.random() * 100 | 0
      expect(RecipeActions.updateRecipe(aggregateId, key, value)).toEqual({
        type: ActionTypes.UPDATE_RECIPE,
        aggregateId,
        aggregateName,
        payload: {
          key,
          value,
        },
        command: {
          type: CommandTypes.UPDATE,
        },
      })
    })
  })

  describe('addFermentable', () => {
    it('should create an action to add a fermentable', () => {
      const aggregateId = uuidV4()
      expect(RecipeActions.addFermentable(aggregateId)).toEqual({
        type: ActionTypes.ADD_RECIPE_FERMENTABLE,
        aggregateId,
        aggregateName,
        payload: {
          isCustom: false,
        },
        command: {
          type: CommandTypes.ADD_FERMENTABLE,
        },
      })
    })
  })

  describe('addCustomFermentable', () => {
    it('should create an action to add a custom fermentable', () => {
      const aggregateId = uuidV4()
      expect(RecipeActions.addCustomFermentable(aggregateId)).toEqual({
        type: ActionTypes.ADD_RECIPE_FERMENTABLE,
        aggregateId,
        aggregateName,
        payload: {
          isCustom: true,
        },
        command: {
          type: CommandTypes.ADD_FERMENTABLE,
        },
      })
    })
  })

  describe('updateFermentable', () => {
    it('should create an action to update the fermentable', () => {
      const aggregateId = uuidV4()
      const fermentableIndex = Math.random() * 10 | 0
      const key = 'amount'
      const value = Math.random() * 100
      expect(
        RecipeActions.updateFermentable(aggregateId, fermentableIndex, key, value),
      ).toEqual({
        type: ActionTypes.UPDATE_RECIPE_FERMENTABLE,
        aggregateId,
        aggregateName,
        payload: {
          fermentableIndex,
          key,
          value,
        },
        command: {
          type: CommandTypes.UPDATE_FERMENTABLE,
        },
      })
    })
  })

  describe('removeFermentable', () => {
    it('should create an action to remove the fermentable', () => {
      const aggregateId = uuidV4()
      const fermentableIndex = Math.random() * 10 | 0
      expect(
        RecipeActions.removeFermentable(aggregateId, fermentableIndex),
      ).toEqual({
        type: ActionTypes.REMOVE_RECIPE_FERMENTABLE,
        aggregateId,
        aggregateName,
        payload: {
          fermentableIndex,
        },
        command: {
          type: CommandTypes.REMOVE_FERMENTABLE,
        },
      })
    })
  })

  describe('addHop', () => {
    it('should create an action to add a hop', () => {
      const aggregateId = uuidV4()
      expect(RecipeActions.addHop(aggregateId)).toEqual({
        type: ActionTypes.ADD_RECIPE_HOP,
        aggregateId,
        aggregateName,
        command: {
          type: CommandTypes.ADD_HOP,
        },
      })
    })
  })

  describe('updateHop', () => {
    it('should create an action to update the hop', () => {
      const aggregateId = uuidV4()
      const hopIndex = Math.random() * 10 | 0
      const key = 'amount'
      const value = Math.random() * 100
      expect(RecipeActions.updateHop(aggregateId, hopIndex, key, value)).toEqual({
        type: ActionTypes.UPDATE_RECIPE_HOP,
        aggregateId,
        aggregateName,
        payload: {
          hopIndex,
          key,
          value,
        },
        command: {
          type: CommandTypes.UPDATE_HOP,
        },
      })
    })
  })

  describe('removeHop', () => {
    it('should create an action to remove the hop', () => {
      const aggregateId = uuidV4()
      const hopIndex = Math.random() * 10 | 0
      expect(RecipeActions.removeHop(aggregateId, hopIndex)).toEqual({
        type: ActionTypes.REMOVE_RECIPE_HOP,
        aggregateId,
        aggregateName,
        payload: {
          hopIndex,
        },
        command: {
          type: CommandTypes.REMOVE_HOP,
        },
      })
    })
  })
})
