import { IUser } from './../types/user'
import { createStore, AnyAction, Store, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

// create a makeStore function
const makeStore = (context: Context) =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// export an assembled wrapper
export const wrapper = createWrapper<Store<IUser>>(makeStore, { debug: true })
