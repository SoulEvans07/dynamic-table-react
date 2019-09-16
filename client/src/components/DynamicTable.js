import React, { Component } from 'react'
import DynamicTableHeader from './DynamicTableHeader'
import DynamicTableRow from './DynamicTableRow'
import './DynamicTable.scss'
import getRef from '../helpers/getRef'
import store from '../store';

class DynamicTable extends Component {
  constructor(props) {
    super()
    this.dispatch = props.dispatch
    this.state = {
      ...props.state,
    }

    store.subscribe(() => {
      const state = store.getState()

      const selected_cell = state.selected_cell
      const selected_table = state.selected_table
      const table = state.tables.find(table => table.id === selected_table)
      const columns = state.columns.filter(col => col.tableId === table.id).sort((a,b) => a.index - b.index)
      const rows = state.rows.filter(row => row.tableId === table.id).sort((a,b) => a.index - b.index)

      const current = { 
        table, 
        columns, 
        rows, 
        cells: state.cells ,
        selected_cell: selected_cell,
        cell_map: state.cell_map
      }
      current.cells.forEach(cell => {
        current.cell_map.set(getRef(cell.tableId, cell.colId, cell.rowId), cell)
      })

      if(this.state !== current) {
        this.setState(current)
      }
    })
  }

  getExcelPos(ref) {
    const [, tableId, colId, rowId] = ref.match(/^#(\w+)@(\w+):(\w+)$/)
    
    const col = this.state.columns.find(col => col.tableId === tableId && col.id === colId)
    const row = this.state.rows.find(row => row.tableId === tableId && row.id === rowId)
    const letter = String.fromCharCode('A'.charCodeAt(0) + col.index)
    const number = row.index +1

    return letter + number
  }

  addRowHandler(tableId, index) {
    this.dispatch({ type: "ADD_ROW", payload: { id: `row_${index}`, style: {}, index, tableId } })
  }

  render() {
    const table = this.state.table
    const columns = this.state.columns
    const rows = this.state.rows
    const cell_map = this.state.cell_map
    const selected_cell = this.state.selected_cell
    const selectedCell = cell_map.get(selected_cell)

    return (
      <div className="Table">
        <div>{ this.state.selected_cell }</div>
        <div>value: { !!selectedCell && selectedCell.value }</div>
        <div>pos: { !!this.state.selected_cell && this.getExcelPos(this.state.selected_cell) }</div>
        
        <DynamicTableHeader 
          state={{ columns }}
          dispatch={ this.dispatch }
        />
        <div className="TableRows">
          { !!rows && rows.map(row => 
            <DynamicTableRow 
              key={ row.id }
              table={ table }
              columns={ columns }
              row={ row }
              state={{
                cell_map,
                selected_cell
              }}
              dispatch={ this.props.dispatch }
            />
          )}
          <div className="TableRow">
            <div className="TableRowNum" onClick={ () => this.addRowHandler(table.id, rows.length) }>+</div>
          </div>
        </div>
      </div>
    )
  }
}

export default DynamicTable