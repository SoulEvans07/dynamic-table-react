import React, { Component } from 'react'
import getRef from '../helpers/getRef'
import store from '../store'

class DynamicTableCell extends Component {
  constructor(props) {
    super()
    this.state = props.state

    store.subscribe(() => {
      const state = store.getState()

      const current = {
        selected_cell: state.selected_cell
      }

      if(this.state !== current) {
        this.setState(current)
      }
    })
  }

  isSelected(table, col, row) {
    return getRef(table, col, row) === this.state.selected_cell
  }

  selectCell(table, col, row) {
    this.props.dispatch({ type: "SELECT_CELL", payload: { selected_cell: getRef(table, col, row) } })
  }

  editCell = () => {
    const table = this.props.table
    const col = this.props.column
    const row = this.props.row
    const ref = getRef(table.id, col.id, row.id)
    this.props.dispatch({
      type: "EDIT_CELL", 
      payload: { 
        ref,
        tableId: table.id,
        colId: col.id,
        rowId: row.id,
        cell: { value: this.refs.el.innerText } 
      }
    })
  }

  render() {
    const table = this.props.table
    const col = this.props.column
    const cell = this.props.cell
    const row = this.props.row

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
        contentEditable
        suppressContentEditableWarning
        ref="el"
        className={ cellStyleClass.join(' ') }
        style={ cellStyle }
        key={ getRef(table.id, col.id, row.id) }
        onClick={ () => this.selectCell(table.id, col.id, row.id) }
        onBlur={ this.editCell }
      >
        { !!cell && cell.value }
      </div>
    )
  }
}

export default DynamicTableCell