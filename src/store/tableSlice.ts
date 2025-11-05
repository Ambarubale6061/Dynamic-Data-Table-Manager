import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Row, ColumnDef } from "../types";
import { v4 as uuidv4 } from "uuid";

type TableState = {
  rows: Row[];
  columns: ColumnDef[];
  editedRows: Record<string, Partial<Row>>;
  searchQuery: string;
  sort: { key: string | null; dir: "asc" | "desc" | null };
  page: number;
  rowsPerPage: number;
  darkMode: boolean;
};

const defaultColumns: ColumnDef[] = [
  { key: "name", label: "Name", visible: true, editable: true },
  { key: "email", label: "Email", visible: true, editable: true },
  { key: "age", label: "Age", visible: true, editable: true },
  { key: "role", label: "Role", visible: true, editable: true }
];

const initialState: TableState = {
  rows: [
    { id: uuidv4(), name: "Alice", email: "alice@example.com", age: 28, role: "Engineer" },
    { id: uuidv4(), name: "Bob", email: "bob@example.com", age: 34, role: "Manager" }
  ],
  columns: defaultColumns,
  editedRows: {},
  searchQuery: "",
  sort: { key: null, dir: null },
  page: 0,
  rowsPerPage: 10,
  darkMode: false
};

const slice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<Row[]>) { state.rows = action.payload; },
    addRow(state, action: PayloadAction<Partial<Row>>) {
      state.rows.unshift({ id: uuidv4(), name: "", email: "", age: 0, role: "", ...action.payload } as Row);
    },
    deleteRow(state, action: PayloadAction<string>) {
      state.rows = state.rows.filter(r => r.id !== action.payload);
      delete state.editedRows[action.payload];
    },
    updateRow(state, action: PayloadAction<{ id: string; patch: Partial<Row> }>) {
      const { id, patch } = action.payload;
      const idx = state.rows.findIndex(r => r.id === id);
      if (idx >= 0) state.rows[idx] = { ...state.rows[idx], ...patch };
    },
    setEditedCell(state, action: PayloadAction<{ id: string; patch: Partial<Row> }>) {
      const { id, patch } = action.payload;
      state.editedRows[id] = { ...(state.editedRows[id] || {}), ...patch };
    },
    saveAllEdits(state) {
      for (const id of Object.keys(state.editedRows)) {
        const idx = state.rows.findIndex(r => r.id === id);
        if (idx >= 0) state.rows[idx] = { ...state.rows[idx], ...state.editedRows[id] };
      }
      state.editedRows = {};
    },
    cancelAllEdits(state) { state.editedRows = {}; },
    setColumns(state, action: PayloadAction<ColumnDef[]>) { state.columns = action.payload; },
    toggleColumnVisibility(state, action: PayloadAction<string>) {
      const col = state.columns.find(c => c.key === action.payload);
      if (col) col.visible = !col.visible;
    },
    addColumn(state, action: PayloadAction<ColumnDef>) { state.columns.push(action.payload); },
    setSearchQuery(state, action: PayloadAction<string>) { state.searchQuery = action.payload; },
    setSort(state, action: PayloadAction<{ key: string | null; dir: "asc" | "desc" | null }>) { state.sort = action.payload; },
    setPage(state, action: PayloadAction<number>) { state.page = action.payload; },
    setRowsPerPage(state, action: PayloadAction<number>) { state.rowsPerPage = action.payload; },
    toggleDarkMode(state) { state.darkMode = !state.darkMode; }
  }
});

export const tableActions = slice.actions;
export default slice.reducer;
