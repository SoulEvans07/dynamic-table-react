import React, { Component } from 'react'

class DynamicTableHeader extends Component {
  constructor(props) {
    super()
    this.state = props.state
  }

  render() {
    const columns = this.state.columns

    return (
      <div className="TableHeader">
        <div className="TableCorner" />
        { columns.map(header => 
          <div className="TableHeaderCell" style={ header.style } key={ header.id }>
            { header.title }
          </div>)
        }
      </div>
    )
  }
}

export default DynamicTableHeader