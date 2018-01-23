// ------------------------------------
// Constants
// ------------------------------------
import axios from 'axios'
export const SHORT_URL = 'SHORT_URL'

// ------------------------------------
// Actions
// ------------------------------------
export function shortURL(data) {
    console.log('>>>DATA<<<', data);
    axios.post('/url', data)
      .then(function (response) {
        console.log('SUCCSESS', response);
        const action = {
          type: SHORT_URL,
          payload: response.data
        };
        console.log('ACTION', action)
        return action;
      })
      .catch(function (error) {
        console.log('ERROR', error);
      });
}

export const actions = {
  shortURL
}

// ------------------------------------
// Action Handlers
// ------------------------------------
export const ACTION_HANDLERS = {
  [SHORT_URL]    : (state, action) => state + action.payload,
}




// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  data : 'dfnjfgkfgokjfgkpj'
}

export default function urlReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
