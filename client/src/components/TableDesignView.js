import React, { Component } from 'react'
import './TableDesignView.scss'

class TableDesignView extends Component {

  addColumnHandler = (tableId, index) => {

  }

  render() {
    const table = this.props.table
    const columns = this.props.columns

    return (
      <div className="DesignView">
        <div className="Table">
          <div className="TableHeader">
            <div className="TableCorner" />
            <div className="TableHeaderCell" style={{ width: '100px' }}>
              <span>Title</span>
            </div>
            <div className="TableHeaderCell" style={{ width: '100px' }}>
              <span>Type</span>
            </div>
            <div className="TableHeaderCell" style={{ width: '200px' }}>
              <span>Style</span>
            </div>
          </div>
          <div className="TableRows">
            { !!columns && columns.map(column =>
              <div className="TableRow" key={ column.id }>
                <div className="TableRowNum">{ column.index }</div>
                <div className="TableCell" style={{ width: '100px' }}>
                  <input value={ column.title }/>
                </div>
                <div className="TableCell" style={{ width: '100px' }}>
                  <input value={ column.type }/>
                </div>
                <div className="TableCell" style={{ width: '200px' }}>
                  <input value={ JSON.stringify(column.style) }/>
                </div>
              </div>)
            }
          </div>
          <div className="AddNewRow" onClick={ () => this.addColumnHandler(table.id, columns.length) }>+</div>
        </div>
      </div>
    )
  }
}

export default TableDesignView