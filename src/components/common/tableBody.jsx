import React, { Component } from "react";
import _ from "lodash";
//import { tsDeclareFunction } from "@babel/types";

class TableBody extends Component {
  renderCell = (item, column) => {
    // console.log(item);
    // console.log(column);
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={item._id + (column.path || column.key)}>
                {<a>{this.renderCell(item, column)}</a>}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
