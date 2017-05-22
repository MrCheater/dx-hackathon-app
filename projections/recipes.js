import Immutable from 'seamless-immutable';
import availableFermentables from '../data/availableFermentables';
import * as EventTypes from '../eventTypes';

export const initialStateFermentable = {
  ...availableFermentables[0],
  amount: 0,
  isCustom: false,
  mashed: false,
}

export const initialStateHop = {
  amount: 0,
  name: '',
  alpha: 0,
  time: 0,
  form: '',
  use: '',
}

export const initialStateMashGuideline = {
  temp: 0,
  time: 0,
  amount: 0,
  type: '',
  name: '',
}

export const initialStateOtherIngredient = {
  name: '',
  amount: 0,
  time: 0,
  type: '',
  use: '',
}

export const initialStateRecipe = {
  name: '',
  author: '',
  style: '',
  batchSize: 40,
  mashEfficiency: 0.75,
  boilTime: 60,
  fermentables: [initialStateFermentable],
  hops: [initialStateHop],
  mashGuidelines: [initialStateMashGuideline],
  mashStartingThickness: '',
  otherIngredients: [initialStateOtherIngredient],
  otherIngredientsPrimingMethod: '',
  otherIngredientsAmount: '',
  otherIngredientsCO2Level: '',
}

export default {
  name: 'recipes',

  initialState: () => Immutable({}),

  eventHandlers: {
    [EventTypes.CREATE_RECIPE]: (state, event) => state.set(event.aggregateId, {
      ...initialStateRecipe,
      createdAt: event.timestamp,
      createdBy: event.payload.userId,
      id: event.aggregateId,
    }),
    [EventTypes.UPDATE_RECIPE]: (state, event) => state.setIn([event.aggregateId, event.payload.key], event.payload.value),
    [EventTypes.REMOVE_RECIPE]: (state, event) => state.without(event.aggregateId),
    [EventTypes.ADD_RECIPE_FERMENTABLE]: (state, event) => state.updateIn(
      [event.aggregateId, 'fermentables'],
      fermentables => [
        ...fermentables,
        {...initialStateFermentable, isCustom: event.payload.isCustom},
      ],
    ),
    [EventTypes.UPDATE_RECIPE_FERMENTABLE]: (state, event) => {
      state = state.setIn(
        [
          event.aggregateId,
          'fermentables',
          event.payload.fermentableIndex,
          event.payload.key,
        ],
        event.payload.value,
      )
      if (event.key === 'name') {
        state = state.updateIn(
          [event.aggregateId, 'fermentables', event.payload.fermentableIndex],
          fermentable => ({
            ...fermentable,
            ...availableFermentables.find(({name}) => name === event.payload.value),
          }),
        )
      }
      return state
    },
    [EventTypes.REMOVE_RECIPE_FERMENTABLE]: (state, event) => state.updateIn(
      [event.aggregateId, 'fermentables'],
      fermentables => {
        let nextFermentables = fermentables.filter(
          (_, fermentableIndex) =>
          event.payload.fermentableIndex !== fermentableIndex,
        )
        if (nextFermentables.length === 0) {
          nextFermentables = [initialStateFermentable]
        }
        return nextFermentables
      },
    ),
    [EventTypes.ADD_RECIPE_HOP]: (state, event) => state.updateIn([event.aggregateId, 'hops'], hops => [
      ...hops,
      initialStateHop,
    ]),
    [EventTypes.UPDATE_RECIPE_HOP]: (state, event) => state.setIn(
      [event.aggregateId, 'hops', event.payload.hopIndex, event.payload.key],
      event.payload.value,
    ),
    [EventTypes.REMOVE_RECIPE_HOP]: (state, event) => state.updateIn([event.aggregateId, 'hops'], hops => {
      let nextHops = hops.filter(
        (_, hopIndex) => event.payload.hopIndex !== hopIndex,
      )
      if (nextHops.length === 0) {
        nextHops = [initialStateHop]
      }
      return nextHops
    })
  }
};