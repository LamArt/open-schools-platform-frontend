import { IUser } from './../types/user'
import { createStore, AnyAction, Store } from 'redux'
import rootReducer from './reducers/rootReducer'
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper'

// create a makeStore function
const makeStore = (context: Context) => createStore(rootReducer)

// export an assembled wrapper
export const wrapper = createWrapper<Store<IUser>>(makeStore, { debug: true })
