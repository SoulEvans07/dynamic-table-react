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
  cells: [
    { id: "0",  value: "adam",   style: { },  rowId: "row_0", colId: "col_0", tableId: "table_1" },
    { id: "4",  value: "anett",  style: { },  rowId: "row_1", colId: "col_0", tableId: "table_1" },
    { id: "2",  value: 24,       style: { },  rowId: "row_0", colId: "col_2", tableId: "table_1" },
    { id: "5",  value: "szi",    style: { },  rowId: "row_1", colId: "col_1", tableId: "table_1" },
    { id: "6",  value: 22,       style: { },  rowId: "row_1", colId: "col_2", tableId: "table_1" },
    { id: "7",  value: "female", style: { },  rowId: "row_1", colId: "col_3", tableId: "table_1" },
    { id: "3",  value: "male",   style: { },  rowId: "row_0", colId: "col_3", tableId: "table_1" },
    { id: "1",  value: "szi",    style: { },  rowId: "row_0", colId: "col_1", tableId: "table_1" },

    { id: "8",  value: "szi",    style: { },  rowId: "row_2", colId: "col_1", tableId: "table_1" },
    // { id: "9",  value: 52,       style: { },  rowId: "row_2", colId: "col_2", tableId: "table_1" },
    { id: "10", value: "tamas",  style: { },  rowId: "row_2", colId: "col_0", tableId: "table_1" },
    { id: "11", value: "male",   style: { },  rowId: "row_2", colId: "col_3", tableId: "table_1" },
  ],
  cell_map: new Map()
}

export default initialState