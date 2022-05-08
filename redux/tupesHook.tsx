import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { IState, UserActionType } from '../types/user'

export const useSelectorTypes: TypedUseSelectorHook<IState> = useSelector
