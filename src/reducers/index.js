import { combineReducers } from 'redux'
import { user } from './userReducers'
import { todo } from './todoReducers'

const reducers = combineReducers({ user, todo })

export default reducers