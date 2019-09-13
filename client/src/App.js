import React, { Component } from 'react'
import './App.scss'
import './Table.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.props.store.subscribe(() => this.forceUpdate())

    // this.props.store.dispatch(fetch())
  }

  state = {
    selected_table: "table_1",

    tables: [
      { id: "table_1", name: "Table #1" },
      { id: "table_2", name: "Random Table #2" }
    ],
    schemas: [ 
      { id: "col_0", title: "first name", type: "string", style: { width: "100px" }, index: 0, tableId: "table_1" }, 
      { id: "col_1", title: "last name",  type: "string", style: { width: "100px" },  index: 1, tableId: "table_1" }, 
      { id: "col_2", title: "age",        type: "number", style: { width: "50px" },  index: 2, tableId: "table_1" }, 
      { id: "col_3", title: "sex",        type: "string", style: { width: "50px" },  index: 3, tableId: "table_1" }
    ],
    rows: [
      { id: "row_0", style: { height: "20px" }, index: 0, tableId: "table_1" },
      { id: "row_1", style: { height: "20px" }, index: 1, tableId: "table_1" },
    ],
    cells: [
      { id: "0", value: "adam",  style: { },  rowId: "row_0", colId: "col_0" },
      { id: "1", value: "szi",   style: { },  rowId: "row_0", colId: "col_1" },
      { id: "2", value: 24,      style: { },  rowId: "row_0", colId: "col_2" },
      { id: "3", value: "male",  style: { },  rowId: "row_0", colId: "col_3" },
      { id: "4", value: "anett", style: { },  rowId: "row_1", colId: "col_0" },
      { id: "5", value: "szi",   style: { },  rowId: "row_1", colId: "col_1" },
      { id: "6", value: 22,      style: { },  rowId: "row_1", colId: "col_2" },
      { id: "7", value: "female",  style: { },  rowId: "row_1", colId: "col_3" }
    ]
  }

  render() {
    const state = this.state
    const selected_table = state.selected_table
    const table = state.tables.find(table => table.id === selected_table)
    const schemas = state.schemas.filter(schema => schema.tableId === table.id)
    const rows = state.rows.filter(row => row.tableId === table.id)

    return (
      <div className="app">
        <div className="header">
          <h1>Dynamic Table</h1>
          <h2>{ table.name }</h2>
        </div>
        <div className="content">
          <div className="Table">
            <div className="TableHeader">
              { !!schemas && schemas.map(header => 
                <div className="TableHeaderCell" style={ header.style } key={header.id}>
                  { header.title }
                </div>)
              }
            </div>
            <div className="TableRows">
              { !!rows && rows.map(row => {
                const cells = state.cells.filter(cell => cell.rowId === row.id)

                return (
                  <div className="TableRow" style={ row.style } key={row.id}>
                    { !!cells && cells.map(cell => {
                      const schema = schemas.find(schema => schema.id === cell.colId)

                      return (
                        <div className="TableCell" style={{ ...schema.style, ...cell.style }}  key={cell.id}>
                          { cell.value }
                        </div>)
                      })
                    }
                  </div>)
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
