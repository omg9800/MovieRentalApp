import React from "react";
import "../../style/movies.scss";
import CusTableHeader from "./cusTableHeader";
import CusTableBody from "./cusTableBody";

const CusTable = ({ columns, onSort, sortColumn, data }) => {
  return (
    <table className="movielist">
      <CusTableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />

      <CusTableBody data={data} columns={columns} />
    </table>
  );
};

export default CusTable;
