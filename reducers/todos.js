import { createReducer } from '../resolve/packages/resolve-redux/src/index'
import todos from '../projections/todos'

export default createReducer(todos)