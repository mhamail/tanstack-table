import React from "react";
import "./table.css";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { columnDef, columnDefWithFilter } from "../components/columns";
import dataJSON from "../components/data.json";

const Combo2 = () => {
    const finalData = React.useMemo(() => dataJSON, []);
    const finalColumnDef = React.useMemo(() => columnDefWithFilter, []);

    const defaultColumn = React.useMemo(() => {
        return {
            youTubeProp: "hello world",
        };
    }, []);

    const [columnFilters, setColumnFilters] = React.useState([]);
    const [filtering, setFiltering] = React.useState("");
    const [sorting, setSorting] = React.useState([]);

    const tableInstance = useReactTable({
        columns: finalColumnDef,
        data: finalData,
        defaultColumn: defaultColumn,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            columnFilters: columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChanged: setFiltering,
        onSortingChange: setSorting,
    });

    //   console.log("test", tableInstance.getHeaderGroups());

    return (
        <>
            <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
            />
            <table>
                <thead>
                    {tableInstance.getHeaderGroups().map((headerEl) => {
                        return (
                            <tr key={headerEl.id}>
                                {headerEl.headers.map((columnEl) => {
                                    {/* console.log(
                    "our property",
                    columnEl.column.columnDef.youTubeProp
                  ); */}

                                    return (
                                        <th key={columnEl.id}
                                            colSpan={columnEl.colSpan}
                                            onClick={columnEl.column.getToggleSortingHandler()}
                                        >
                                            {columnEl.isPlaceholder ? null : (
                                                <>
                                                    {flexRender(
                                                        columnEl.column.columnDef.header,
                                                        columnEl.getContext()
                                                    )}
                                                    {/* sorting */}
                                                    {
                                                        { asc: " -UP", desc: " -DOWN" }[
                                                        columnEl.column.getIsSorted() ?? null
                                                        ]
                                                    }
                                                    {/* filtering */}
                                                    {columnEl.column.getCanFilter() ? (
                                                        <div>
                                                            <input type="text"
                                                                value={(columnEl.column.getFilterValue() || '')}
                                                                onChange={(e) => columnEl.column.setFilterValue(e.target.value)}

                                                            />
                                                        </div>
                                                    ) : null}
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
                    {tableInstance.getRowModel().rows.map((rowEl) => {
                        return (
                            <tr key={rowEl.id}>
                                {rowEl.getVisibleCells().map((cellEl) => {
                                    return (
                                        <td key={cellEl.id}>
                                            {flexRender(
                                                cellEl.column.columnDef.cell,
                                                cellEl.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <hr />
            <div>
                <button
                    onClick={() => tableInstance.setPageIndex(0)}
                    disabled={!tableInstance.getCanPreviousPage()}
                >
                    {"<<"}
                </button>
                <button
                    onClick={() => tableInstance.previousPage()}
                    disabled={!tableInstance.getCanPreviousPage()}
                >
                    Previous Page
                </button>
                <button
                    onClick={() => tableInstance.nextPage()}
                    disabled={!tableInstance.getCanNextPage()}
                >
                    Next Page
                </button>
                <button
                    onClick={() =>
                        tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
                    }
                    disabled={!tableInstance.getCanNextPage()}
                >
                    {">>"}
                </button>
            </div>
            <ul>
                <li>
                    You are on page number:{" "}
                    {tableInstance.options.state.pagination.pageIndex}
                </li>
                <li>Total pages: {tableInstance.getPageCount() - 1}</li>
            </ul>
            <hr />
            <input
                type="number"
                defaultValue={tableInstance.options.state.pagination.pageIndex}
                onChange={(e) => tableInstance.setPageIndex(e.target.value)}
            />
            <hr />
            <h4>
                Current page size: {tableInstance.options.state.pagination.pageSize}
            </h4>
            <select
                value={tableInstance.options.state.pagination.pageSize}
                onChange={(e) => tableInstance.setPageSize(e.target.value)}
            >
                {[10, 25, 50].map((pageSizeEl) => {
                    return (
                        <option key={pageSizeEl} value={pageSizeEl}>
                            {pageSizeEl}
                        </option>
                    );
                })}
            </select>
        </>
    );
};

export default Combo2;
