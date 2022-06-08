import { IUserData, UserDataActionEnum, UserDataActionType } from '../../types/user'

const initialState: IUserData = { name: '', phone: '', id: undefined, loading: false, error: ''}

const userDataReucer = (
  state = initialState,
  action: UserDataActionType
): IUserData => {
  switch (action.type) {
    case UserDataActionEnum.FINALFETCH :
      return {...state, ...action.payload, loading: false}
    case UserDataActionEnum.LOADINGDATA :
      return {...state, loading: true}
    case UserDataActionEnum.ERRORFRTCH :
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

export default userDataReucer
