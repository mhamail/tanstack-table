import React from "react";
import "./table.css";
import { columnDef, columnDefMerge, columnDefGroup } from "../components/columns";
import dataJSON from "../components/data";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";

const ColumnHiding = () => {
  const dataFinal = React.useMemo(() => dataJSON, []);
  const columnsFinal = React.useMemo(() => columnDef, []);

  const [columnVisibility, setColumnVisibility] = React.useState({});

  const table = useReactTable({
    columns: columnsFinal,
    data: dataFinal,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  //   console.log(table.getRowModel());

  return (
    <>
      <div>
        <label>
          <input
            {...{
              type: "checkbox",
              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />{" "}
          Toggle All
        </label>
      </div>
      <hr />
      {table.getAllLeafColumns().map((column) => {
        return (
          <div key={column.id}>
            <label>
              <input
                {...{
                  type: "checkbox",
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />{" "}
              {column.id}
            </label>
          </div>
        );
      })}
      <hr />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {
                        <>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </>
                      }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ColumnHiding;
