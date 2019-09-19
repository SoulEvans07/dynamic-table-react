import React, { Component } from 'react'
import getRef from '../helpers/getRef'
import store from '../store'
import { evaluate } from 'mathjs'

class DynamicTableCell extends Component {
  constructor(props) {
    super()
    this.state = props.state

    this.unsubscribe = store.subscribe(() => {
      const state = store.getState()

      const current = {
        selected_cell: state.selected_cell
      }

      if(this.state !== current) {
        this.setState(current)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  isSelected = () => {
    const table = this.props.table
    const col = this.props.column
    const row = this.props.row
    return getRef(table.id, col.id, row.id) === this.state.selected_cell
  }

  selectCell = () => {
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
        cell: { 
          inlineEdit: true
        } 
      }
    })
    this.props.dispatch({ type: "SELECT_CELL", payload: { selected_cell: ref } })
  }

  editCell = (event) => {
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
        cell: { 
          value: event.target.value
        } 
      }
    })
  }

  updateCell = () => {
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
        cell: { 
          inlineEdit: false
        } 
      }
    })
  }

  calcExpression(expr) {
    if(!expr) return "#REF!"

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
    if(this.isSelected()) {
      cellStyleClass.push("selected")
    }
    if(cell) {
      cellStyle = { ...cellStyle, ...cell.style }

      if(cell.inlineEdit) {
        value = cell.value
      } else {
        value = this.calcValue(cell)      
      }
    }
    
    return (
      <div className={ cellStyleClass.join(' ') } style={ cellStyle }>
        <input
          key={ getRef(table.id, col.id, row.id) }
          onFocus={ this.selectCell }
          onChange={ this.editCell }
          onBlur={ this.updateCell }
          value={ value }
        />
        { this.isSelected() && 
          <div className="SelectionDot"></div>
        }
      </div>
    )
  }
}

export default DynamicTableCell