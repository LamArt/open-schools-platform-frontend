import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { IUser, IUserData } from '../../types/user'
import UserDataReucer from './UserDataReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  userData: UserDataReucer
})

export default rootReducer

export type RootState = {auth:IUser | null, userData: IUserData}

 