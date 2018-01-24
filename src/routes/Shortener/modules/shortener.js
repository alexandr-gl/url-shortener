// ------------------------------------
// Constants
// ------------------------------------
import axios from 'axios'
export const SHORT_URL = 'SHORT_URL'
export const GET_URLS = 'GET_URLS'

// ------------------------------------
// Actions
// ------------------------------------
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export function shortUrl(data) {
  console.log('CHECK DATA IN ACTION', data)
  return (dispatch) => {
    return axios.post('/url/url', data)
      .then(function (response) {
        if(response.data === 'Link is busy')
        {
          alert(response.data)
        }
        dispatch({
          type    : SHORT_URL,
          payload : response.data
        })
      })
      .catch(function (error) {
        console.log('Request failed', error)
      })
  }
}

export function getUrls() {
  return (dispatch) => {
    return axios.get('/url/url')
      .then(function (response){
        console.log('ACTION RESPONSE', response.data)
        dispatch({
          type    : GET_URLS,
          payload : response.data
        })
      }).catch(function (error) {
        console.log('Request failed', error)
      })
  }
}

export const actions = {
  shortUrl, getUrls
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SHORT_URL]  : (state, action) => { return Object.assign({}, state, { data:action.payload }) },
  [GET_URLS]  : (state, action) => { return Object.assign({}, state, { urls:action.payload }) },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data: '',
  urls: ''
}
export default function UrlReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
