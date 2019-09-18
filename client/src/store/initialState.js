/* eslint-disable no-template-curly-in-string */

const initialState = {
  error: null,
  selected_table: "table_1",
  selected_cell: null,

  tables: [
    { id: "table_1", name: "Table #1" },
    { id: "table_2", name: "Random Table #2" }
  ],
  columns: [ 
    { id: "col_0", title: "first name", type: "string", style: { width: "100px" }, index: 0, tableId: "table_1" }, 
    { id: "col_2", title: "age",        type: "number", style: { width: "50px" },  index: 2, tableId: "table_1" }, 
    { id: "col_3", title: "sex",        type: "string", style: { width: "50px" },  index: 3, tableId: "table_1" },
    { id: "col_1", title: "last name",  type: "string", style: { width: "100px" }, index: 1, tableId: "table_1" },
    { id: "ran_0", title: "random col", type: "string", style: { width: "100px" }, index: 0, tableId: "table_2" }, 
  ],
  rows: [
    { id: "row_1", style: { height: "20px" }, index: 1, tableId: "table_1" },
    { id: "row_0", style: { height: "20px" }, index: 0, tableId: "table_1" },
    { id: "row_2", style: { height: "20px" }, index: 2, tableId: "table_1" },
  ],
  cells: [],
  cell_map: new Map()
}

export default initialState