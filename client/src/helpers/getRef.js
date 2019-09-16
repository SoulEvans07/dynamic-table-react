// TODO: if tableId is not found in ref put the table in which the ref is
export default function getRef(table, col, row) {
  return `#${table}@${col}:${row}`
}