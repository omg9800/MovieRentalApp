import React, { Component } from "react";
import _ from "lodash";
//import { tsDeclareFunction } from "@babel/types";

class RentTableBody extends Component {
  renderCell = (item, column) => {
    //console.log(item);
    //console.log(column);
    //console.log(_.get(item, column.path));
    if (column.content) return column.content(item);
    if (_.get(item, column.path) === true) return "Yes";
    else if (_.get(item, column.path) === false) return "No";
    else return _.get(item, column.path);
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

export default RentTableBody;
