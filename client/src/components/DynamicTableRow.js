import React, { Component } from 'react'
import DynamicTableCell from './DynamicTableCell'
import getRef from '../helpers/getRef'
import store from '../store'

class DynamicTableRow extends Component {
  constructor(props) {
    super()
    this.state = props.state

    this.unsubscribe = store.subscribe(() => {
      const state = store.getState()

      const cell_map = state.cell_map
      const selected_cell = state.selected_cell

      const current = {
        cell_map,
        selected_cell,
      }
      
      if(this.state !== current) {
        this.setState(current)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const table = this.props.table
    const row = this.props.row
    const columns = this.props.columns

    const cell_map = this.state.cell_map
    const selected_cell = this.state.selected_cell

    return (
      <div className="TableRow" style={ row.style } key={ row.id }>
        <div className="TableRowNum">{ row.index }</div>
        { columns.map(col => {
            const ref = getRef(table.id, col.id, row.id)
            const cell = cell_map[ref]

            return (
              <DynamicTableCell
                key={ ref }
                table={ table }
                row={ row }
                column={ col }
                cell={ cell }
                state={{
                  selected_cell
                }}
                dispatch={ this.props.dispatch }
              />
            )
          })
        }
      </div>
    )
  }
}

export default DynamicTableRow