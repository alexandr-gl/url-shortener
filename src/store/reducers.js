import { combineReducers } from 'redux'
import locationReducer from './location'
import UrlReducer from '../../src/routes/Shortener/modules/shortener'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    shortener: UrlReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
