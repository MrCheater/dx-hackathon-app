import {combineReducers} from 'redux'
import recipes from './recipes'
import brewhouses from './brewhouses'
import user from './user'
import authForm from './authForm'

export default combineReducers({
  recipes,
  brewhouses,
  user,
  authForm
})