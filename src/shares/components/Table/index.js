import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledBoxIconSorting } from "./Table.styles";
const Table = ({
  columns,
  data,
  pageIndex,
  pageSize,
  setStateRowSelection,
  onSelectedRowChange,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    if ((pageIndex, pageSize)) {
      setPagination({ pageIndex: pageIndex, pageSize: pageSize });
    }
  }, [pageIndex, pageSize]);
  const {
    getHeaderGroups,
    getRowModel,
    getPageCount,
    getState,
    getSelectedRowModel,
  } = useReactTable({
    columns,
    data,
    debugTable: true,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      rowSelection,
    },
  });

  const handleChangePage = (event, newPage) => {
    setPagination({ ...pagination, pageIndex: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({ pageIndex: 0, pageSize: parseInt(event.target.value, 10) });
  };

  useEffect(() => {
    onSelectedRowChange(
      getSelectedRowModel().flatRows.map((row) => row.original)
    );
  }, [rowSelection, getSelectedRowModel, onSelectedRowChange]);

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer
        sx={{ borderRadius: "8px", boxShadow: "0px -4px 16px 0px #0000000D" }}
      >
        <TableHead sx={{ backgroundColor: "#EBEDF5" }}>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup?.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    sx={{
                      flex: `${header.getSize()} 0 auto`,
                      width: header.getSize(),
                    }}
                  >
                    <StyledBoxIconSorting
                      {...{
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                      sx={{ textAlign: "left", justifyContent: "flex-start" }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {{
                        asc: <KeyboardArrowUpIcon />,
                        desc: <KeyboardArrowDownIcon />,
                      }[header.column.getIsSorted()] ?? null}
                    </StyledBoxIconSorting>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
      <TablePagination
        component="div"
        count={getPageCount().toLocaleString()}
        page={getState().pagination.pageIndex + 1}
        rowsPerPage={getState().pagination.pageSize}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "#FFF",
          boxShadow: "0px 0px 24px 0px #0000000D",
        }}
      />
    </Box>
  );
};

export default Table;
