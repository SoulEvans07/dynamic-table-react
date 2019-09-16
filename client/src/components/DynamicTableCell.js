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
        className={ cellStyleClass.join(' ') }
        style={ cellStyle }
        key={ getRef(table.id, col.id, row.id) }
        onClick={ () => this.selectCell(table.id, col.id, row.id) }>
        { !!cell && cell.value }
      </div>
    )
  }
}

export default DynamicTableCell