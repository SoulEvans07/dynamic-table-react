import React, { Component } from 'react'
import './DynamicTable.scss'

class DynamicTable extends Component {
  constructor(props) {
    super()
    this.state = {
      selected_cell: null, //"#table_1@col_3:row_1",
      schema_map: new Map(),
      row_map: new Map(),
      cell_map: new Map()
    }
    props.schemas.forEach(schema => {
      this.state.schema_map.set(schema.id, schema)
    })
    props.rows.forEach(row => {
      this.state.row_map.set(row.id, row)
    })
    props.cells.forEach(cell => {
      this.state.cell_map.set(this.getRef(cell.tableId, cell.colId, cell.rowId), cell)
    })
  }

  // TODO: if tableId is not found in ref put the table in which the ref is
  getRef(table, col, row) {
    return `#${table}@${col}:${row}`
  }

  selectCell(table, col, row) {
    this.setState({ selected_cell: this.getRef(table, col, row) })
  }

  isSelected(table, col, row) {
    return this.getRef(table, col, row) === this.state.selected_cell
  }

  // TODO: if tableId is not found in ref use the table in which the ref is
  getCellByRef(ref) {
    if(ref){
      const [, tableId, colId, rowId] = ref.match(/^#(\w+)@(\w+):(\w+)$/)
      
      if(tableId !== undefined && colId !== undefined && rowId !== undefined) {
        return this.state.cell_map.get(this.getRef(tableId, colId, rowId))
      }
    }

    return null
  }

  getExcelPos(ref) {
    const [, tableId, colId, rowId] = ref.match(/^#(\w+)@(\w+):(\w+)$/)
    
    const col = this.props.schemas.find(col => col.tableId === tableId && col.id === colId)
    const row = this.props.rows.find(row => row.tableId === tableId && row.id === rowId)
    const letter = String.fromCharCode('A'.charCodeAt(0) + col.index)
    const number = row.index +1

    return letter + number
  }

  render() {
    const state = this.state
    const table = this.props.table
    const schemas = this.props.schemas
    const rows = this.props.rows
    const selectedCell = this.getCellByRef(state.selected_cell)

    return (
      <div className="Table">
        <div>{ state.selected_cell }</div>
        <div>value: { !!selectedCell && selectedCell.value }</div>
        <div>pos: { !!state.selected_cell && this.getExcelPos(state.selected_cell) }</div>
        
        <div className="TableHeader">
          <div className="TableCorner" />
          { schemas.map(header => 
            <div className="TableHeaderCell" style={ header.style } key={header.id}>
              { header.title }
            </div>)
          }
        </div>
        <div className="TableRows">
          { !!rows && rows.map(row => {
            return (
              <div className="TableRow" style={ row.style } key={row.id}>
                <div className="TableRowNum">{ row.index }</div>
                { schemas.map(col => {
                    const cell = this.getCellByRef(this.getRef(table.id, col.id, row.id))
                    const cellStyleClass = [ "TableCell" ]
                    let cellStyle = { ...col.style }
                    if(this.isSelected(table.id, col.id, row.id)) {
                      cellStyleClass.push("selected")
                    }
                    if(cell) {
                      cellStyle = { ...cellStyle, ...cell.style }
                    }

                    return (
                      <div 
                        className={ cellStyleClass.join(' ') }
                        style={ cellStyle }
                        key={ this.getRef(table.id, col.id, row.id) }
                        onClick={ () => this.selectCell(table.id, col.id, row.id) }>
                        { !!cell && cell.value }
                      </div>)
                  })
                }
              </div>)
            })
          }
        </div>
      </div>
    )
  }
}

export default DynamicTable