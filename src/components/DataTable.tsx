"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { tableActions } from "../store/tableSlice";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TablePagination,
  IconButton,
  TextField,
  Button,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import InlineCell from "./InlineCell";

export default function DataTable() {
  const dispatch = useDispatch();
  const { rows, columns, searchQuery, sort, page, rowsPerPage } = useSelector((s: RootState) => s.table);

  const visibleCols = columns.filter(c => c.visible);
  const filtered = React.useMemo(() => {
    if (!searchQuery) return rows;
    const q = searchQuery.toLowerCase();
    return rows.filter(r =>
      visibleCols.some(c => {
        const val = r[c.key];
        return val !== undefined && String(val).toLowerCase().includes(q);
      })
    );
  }, [rows, searchQuery, columns]);

  const sorted = React.useMemo(() => {
    const { key, dir } = sort;
    if (!key || !dir) return filtered;
    return [...filtered].sort((a, b) => {
      const va = a[key as string];
      const vb = b[key as string];
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "number" && typeof vb === "number") {
        return dir === "asc" ? va - vb : vb - va;
      }
      return dir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });
  }, [filtered, sort]);

  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  function handleSort(colKey: string) {
    const current = sort.key === colKey ? sort.dir : null;
    if (!current) dispatch(tableActions.setSort({ key: colKey, dir: "asc" }));
    else if (current === "asc") dispatch(tableActions.setSort({ key: colKey, dir: "desc" }));
    else dispatch(tableActions.setSort({ key: null, dir: null }));
  }

  function handleDelete(id: string) {
    if (confirm("Delete this row?")) dispatch(tableActions.deleteRow(id));
  }

  return (
    <Paper sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {visibleCols.map(col => (
                <TableCell key={col.key} onClick={() => handleSort(col.key)} sx={{ cursor: "pointer", minWidth: 120 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{col.label}</span>
                    {sort.key === col.key ? (sort.dir === "asc" ? " ▲" : " ▼") : null}
                  </Box>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={visibleCols.length + 1}>
                <TextField
                  placeholder="Global search..."
                  fullWidth
                  value={searchQuery}
                  onChange={e => dispatch(tableActions.setSearchQuery(e.target.value))}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map(row => (
              <TableRow key={row.id}>
                {visibleCols.map(col => (
                  <TableCell key={col.key}>
                    <InlineCell row={row} column={col} />
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => dispatch(tableActions.setEditedCell({ id: row.id, patch: {} }))}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={visibleCols.length + 1} style={{ textAlign: "center" }}>
                  No rows
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p:1 }}>
        <div>
          <Button variant="contained" onClick={() => dispatch(tableActions.saveAllEdits())} startIcon={<SaveIcon />} sx={{ mr: 1 }}>
            Save All
          </Button>
          <Button variant="outlined" onClick={() => dispatch(tableActions.cancelAllEdits())} startIcon={<CancelIcon />}>
            Cancel All
          </Button>
        </div>

        <TablePagination
          component="div"
          count={sorted.length}
          page={page}
          onPageChange={(_, newPage) => dispatch(tableActions.setPage(newPage))}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={e => dispatch(tableActions.setRowsPerPage(parseInt(e.target.value, 10)))}
          rowsPerPageOptions={[5,10,25]}
        />
      </Box>
    </Paper>
  );
}
