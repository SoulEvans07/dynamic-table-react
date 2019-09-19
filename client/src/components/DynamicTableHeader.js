import React, { Component } from 'react'

class DynamicTableHeader extends Component {
  constructor(props) {
    super()
  }

  addColumn(tableId, index) {
    if(this.refs.newCol.innerText) {
      this.props.dispatch({ 
        type: "ADD_COLUMN", 
        payload: {
          id: `col_${index}`,
          title: this.refs.newCol.innerText, 
          style: { width: "50px" }, 
          index, 
          tableId
        }
      })
      
      this.refs.newCol.innerText = ""
    }
  }

  render() {
    const table = this.props.table
    const columns = this.props.columns

    return (
      <div className="TableHeader">
        <div className="TableCorner" />
        { columns.map(header => 
          <div className="TableHeaderCell" style={ header.style } key={ header.id }>
            <span>{ header.title }</span>
          </div>)
        }
        {/* <div className="TableHeaderCell"
          contentEditable
          suppressContentEditableWarning
          ref="newCol"
          style={{ width: "50px", textAlign: "center" }}
          onBlur={ () => this.addColumn(table.id, columns.length) }>
        </div> */}
      </div>
    )
  }
}

export default DynamicTableHeader