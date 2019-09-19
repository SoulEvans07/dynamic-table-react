import React, { Component } from 'react'
import './App.scss'

import DynamicTable from './components/DynamicTable'
import TableDesignView from './components/TableDesignView';
import store from './store';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = this.props.state
    this.dispatch = this.props.dispatch

    this.unsubscribe = store.subscribe(() => {
      const state = store.getState()
      if(this.state !== state) {
        this.setState(state)
      }
    })
  }

  componentDidMount() {
    this.dispatch({ type: "REFRESH_CELLMAP" })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  changeMode = (mode) => {
    this.dispatch({ type: "CHANGE_MODE", payload: { mode } })
  }

  render() {
    const mode = this.state.mode
    const selected_table = this.state.selected_table
    const table = this.state.tables.find(table => table.id === selected_table)
    const columns = this.state.columns.filter(schema => schema.tableId === table.id).sort((a,b) => a.index - b.index)
    const rows = this.state.rows.filter(row => row.tableId === table.id).sort((a,b) => a.index - b.index)

    return (
      <div className="app">
        <div className="header">
          <h1>Dynamic Table</h1>
          <h2>{ table.name } ({ mode })</h2>
          <div className="Tools">
            <i className="fas fa-table" title="data" onClick={ () => this.changeMode('data') }></i>
            <i className="fas fa-pencil-ruler" title="design" onClick={ () => this.changeMode('design') }></i>
          </div>
        </div>
        <div className="content">
          { (columns && mode === 'data') &&
            <DynamicTable 
              state={{
                table, 
                columns, 
                rows, 
                cells: this.state.cells,
                cell_map: this.state.cell_map,
                selected_cell: this.state.selected_cell,
                selected_table
              }}
              dispatch={ this.dispatch }
            />
          }
          { (columns && mode === 'design') &&
            <TableDesignView
              columns={ columns }
              dispatch={ this.dispatch }
            />
          }
        </div>
      </div>
    )
  }
}

export default App;
