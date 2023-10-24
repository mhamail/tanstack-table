import { createColumnHelper } from "@tanstack/react-table";
import IndeterminateCheckbox from "./IndeterminateCheckbox";
import moment from "moment";

const columnHelper = createColumnHelper();

export const columnDef = [
  columnHelper.accessor("id", {
    header: "Id",
  }),
  {
    accessorFn: (row) => `${row.first_name}`,
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => moment(new Date(getValue())).format("MMM Do YY"),
  },
];

// cell merge example
const columnDefWithCellMerge = [
  {
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "Name",
  },
];

export const columnDefWithGrouping = [
  columnHelper.accessor("id", {
    header: "Id",
  }),
  {
    header: "Name",
    columns: [
      {
        accessorFn: (row) => `${row.first_name}`,
        header: "First Name",
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
      },
    ],
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

// columnDef with Filters

export const columnDefWithFilter = [
  columnHelper.accessor("id", {
    header: "Id",
    enableColumnFilter: false,
  }),
  {
    accessorFn: (row) => `${row.first_name}`,
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    // enableColumnFilter: false,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => moment(new Date(getValue())).format("MMM Do YY"),
  },
];

export const columnDefWithSelect = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <IndeterminateCheckbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  {
    accessorKey: "id",
    enableColumnFilter: false,
  },
  {
    accessorKey: "first_name",
  },
  {
    accessorKey: "last_name",
  },
  {
    accessorKey: "date",
    // cell: ({ getValue }) => `${getValue()} mah man`,
  },
];


