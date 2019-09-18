import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import getRef from '../helpers/getRef'
import initialState from './initialState'

function addRow(state, payload) {
  return { ...state, rows: [ ...state.rows, payload ] }
}

function addCol(state, payload) {
  return { ...state, columns: [ ...state.columns, payload ]}
}

function selectCell(state, payload) {
  return { ...state, selected_cell: payload.selected_cell }
}

function editCell(state, payload) {
  const cells = [ ...state.cells ]
  let cell = cells.find(cell => getRef(cell.tableId, cell.colId, cell.rowId) === payload.ref)
  
  if(cell) {
    const index = state.cells.indexOf(cell)
    cell = { ...cell, ...payload.cell }
    if(cells[index] !== cell){
      cells[index] = cell
    }
  } else {
    cell = {
      // TODO: id
      value: "",
      style: {},
      rowId: payload.rowId,
      colId: payload.colId,
      tableId: payload.tableId,

      ...payload.cell
    }
    cells.push(cell)
  }

  return { ...state, cells }
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
    case "ADD_COLUMN":
      return addCol(state, action.payload)
    case "SELECT_CELL":
      return selectCell(state, action.payload)
    case "EDIT_CELL":
      return editCell(state, action.payload)
    case "REFRESH_CELLMAP":
      return refreshCellMap(state)
    default:
      return state
  }
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store
