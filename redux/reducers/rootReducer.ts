import authReducer from './authReducer'
import { combineReducers, Reducer } from 'redux'
import { IUser } from '../../types/user'

const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer

export type RootState = {auth:IUser | null}

 