import React, { Component } from 'react'
import './TableDesignView.scss'

class TableDesignView extends Component {

  render() {
    const columns = this.props.columns

    return (
      <div className="TableDesignView">
        <div className="Table">
          <div className="TableHeader">

          </div>
          <div className="TableRows">
            { !!columns && columns.map(column =>
              <div className="TableRow" key={ column.id }>
                <div>{ column.title }</div>
                <div>{ column.type }</div>
                <div>{ JSON.stringify(column.style) }</div>
              </div>)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default TableDesignView