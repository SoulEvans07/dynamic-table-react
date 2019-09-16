import React, { Component } from 'react'
import './DynamicTable.scss'

class DynamicTable extends Component {
  constructor(props) {
    super()
    this.state = {
      selected_cell: null, //"#table_1@col_3:row_1",
      schema_map: new Map(),
      row_map: new Map()
    }
    props.schemas.forEach(schema => {
      this.state.schema_map.set(schema.id, schema)
    })
    props.rows.forEach(row => {
      this.state.row_map.set(row.id, row)
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
  getValueOf(ref) {
    if(ref){
      const [, tableId, colId, rowId] = ref.match(/^#(\w+)@(\w+):(\w+)$/)
      
      if(tableId !== undefined && colId !== undefined && rowId !== undefined) {
        return this.props.cells.find(cell => {
          return cell.tableId === tableId 
            && cell.colId === colId
            && cell.rowId === rowId
        })
      }
    }

    return null
  }

  getExcelPos(cell) {
    const col = this.props.schemas.find(col => cell.tableId && col.id === cell.colId)
    const row = this.props.rows.find(row => row.tableId === cell.tableId && row.id === cell.rowId)
    const letter = String.fromCharCode('A'.charCodeAt(0)+col.index)
    const number = row.index +1

    return letter + number
  }

  render() {
    const state = this.state
    const table = this.props.table
    const schemas = this.props.schemas
    const rows = this.props.rows
    const all_cells = this.props.cells
    const selectedCell = this.getValueOf(state.selected_cell)

    return (
      <div className="Table">
        <div>{ state.selected_cell }</div>
        <div>value: { !!selectedCell && selectedCell.value }</div>
        <div>pos: { !!selectedCell && this.getExcelPos(selectedCell) }</div>
        
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
            const cells = all_cells
              .filter(cell => cell.rowId === row.id)
              .sort((a, b) => {
                return state.schema_map.get(a.colId).index - state.schema_map.get(b.colId).index
              })            

            return (
              <div className="TableRow" style={ row.style } key={row.id}>
                <div className="TableRowNum">{ row.index }</div>
                { !!cells && cells.map(cell => {
                  const schema = schemas.find(schema => schema.id === cell.colId)
                  const cellStyleClass = [ "TableCell" ]
                  if(this.isSelected(table.id, cell.colId, cell.rowId)) {
                    cellStyleClass.push("selected")
                  }
                  return (
                    <div 
                      className={ cellStyleClass.join(' ') }
                      style={{ ...schema.style, ...cell.style }}
                      key={cell.id}
                      onClick={ () => this.selectCell(table.id, cell.colId, cell.rowId) }>
                      { cell.value }
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