import React from "react";
import "./App.css";

// components
import BasicTable from "./tables/BasicTable";
import SortingTable from "./tables/SortingTable";
import GlobalFiltering from "./tables/GlobalFiltering";
import ColumnFiltering from "./tables/ColumnFiltering";
import PaginationTable from "./tables/PaginationTable";
import RowSelection from "./tables/RowSelection";
import ColumnHiding from "./tables/ColumnHiding";
import Combo1 from "./tables/Combo1"; //combination of sorting, globalfiltring and column filtering
import Combo2 from "./tables/Combo2"; //... combination of pagination
import Combo3 from "./tables/Combo3";

function App() {
  return (
    <div >
      <Combo3 />
    </div>
  );
}

export default App;
