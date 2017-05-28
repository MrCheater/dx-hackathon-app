import { createReducer } from 'resolve-redux'
import todos from '../projections/todos'

export default createReducer(todos)
