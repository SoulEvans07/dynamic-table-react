import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import getRef from '../helpers/getRef'
import initialState from './initialState'

function addRow(state, payload) {
  return { ...state, rows: [ ...state.rows, payload ] }
}

function refreshCellMap(state) {
  const map = new Map()
  state.cells.forEach(cell => {
    map.set(getRef(cell.tableId, cell.colId, cell.rowId), cell)
  })
  return { ...state, cell_map: map }
}

function rootReducer(state, action) {
  switch (action.type) {
    case "ADD_ROW":
      return addRow(state, action.payload)
    case "REFRESH_CELLMAP":
      return refreshCellMap(state)
    default:
      return state
  }
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store
