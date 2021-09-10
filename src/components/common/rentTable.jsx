import React from "react";
import "../../style/movies.scss";
import RentTableHeader from "./rentTableHeader";
import RentTableBody from "./rentTableBody";

const RentTable = ({ columns, onSort, sortColumn, data }) => {
  return (
    <table className="movielist">
      <RentTableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />

      <RentTableBody data={data} columns={columns} />
    </table>
  );
};

export default RentTable;
