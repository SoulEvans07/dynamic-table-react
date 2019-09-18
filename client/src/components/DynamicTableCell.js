import React, { Component } from 'react'
import getRef from '../helpers/getRef'
import store from '../store'
import { evaluate } from 'mathjs'

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
    if(this.props.cell) {
      this.refs.el.innerText = this.props.cell.value
    }
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
    this.refs.el.innerText = this.calcValue(this.props.cell)
  }

  calcExpression(expr) {
    const map = store.getState().cell_map
    const tokenize = (ex) => ex.split(/(#\w+@\w+:\w+)/)
    let value = ""

    let tokens = tokenize(expr)
    tokens = tokens.map(token => {
      if(token.match(/^#\w+@\w+:\w+$/)){
        const cell = map[token]
        return cell ? cell.value : "#REF!"
      } else {
        return token
      }
    })
    
    expr = tokens.join('')
    try {
      value = evaluate(expr)
    } catch(e) {
      value = "#REF!"
    }

    return value
  }

  calcValue(cell) {
    let value = ""

    if(cell && cell.value && typeof cell.value === 'string'){
      if(cell.value.startsWith('=')){
        value = this.calcExpression(cell.value.substring(1).trim())
      } else {
        value = cell.value
      }
    }

    return value
  }

  render() {
    const table = this.props.table
    const col = this.props.column
    const cell = this.props.cell
    const row = this.props.row

    let value = ""

    const cellStyleClass = [ "TableCell" ]
    let cellStyle = { ...col.style }
    if(this.isSelected(table.id, col.id, row.id)) {
      cellStyleClass.push("selected")
    }
    if(cell) {
      cellStyle = { ...cellStyle, ...cell.style }

      value = this.calcValue(cell)      
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
        onFocus={ () => this.selectCell(table.id, col.id, row.id) }
        onBlur={ this.editCell }
      >
        { !!cell && value }
      </div>
    )
  }
}

export default DynamicTableCell