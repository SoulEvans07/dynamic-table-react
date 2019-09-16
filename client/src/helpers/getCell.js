import getRef from './getRef'

// TODO: if tableId is not found in ref use the table in which the ref is
export default function getCell(map, tableId, colId, rowId) {
  if(ref){
    if(tableId !== undefined && colId !== undefined && rowId !== undefined) {
      return map.get(getRef(tableId, colId, rowId))
    }
  }

  return null
}