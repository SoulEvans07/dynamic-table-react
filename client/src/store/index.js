import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  error: null,
  table: {
    schema: [],
    rows: [],
    cells: []
  }
}

function rootReducer(state, action) {
  switch (action.type) {
    default:
      return state
  }
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store
