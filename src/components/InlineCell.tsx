"use client";
import React from "react";
import { ColumnDef, Row } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { tableActions } from "../store/tableSlice";
import { RootState } from "../store";
import { TextField } from "@mui/material";

export default function InlineCell({ row, column }: { row: Row; column: ColumnDef }) {
  const dispatch = useDispatch();
  const edited = useSelector((s: RootState) => s.table.editedRows[row.id] || {});
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState<any>(row[column.key]);

  React.useEffect(() => {
    setValue(edited[column.key] ?? row[column.key]);
  }, [edited, row, column.key]);

  function commit() {
    if (column.key === "age") {
      const n = Number(value);
      if (Number.isNaN(n)) {
        alert("Age must be a number");
        return;
      }
      dispatch(tableActions.setEditedCell({ id: row.id, patch: { [column.key]: n } }));
    } else {
      dispatch(tableActions.setEditedCell({ id: row.id, patch: { [column.key]: value } }));
    }
    setEditing(false);
  }

  return editing ? (
    <TextField
      value={value ?? ""}
      size="small"
      onChange={e => setValue(e.target.value)}
      onBlur={commit}
      onKeyDown={e => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") setEditing(false);
      }}
      autoFocus
    />
  ) : (
    <div onDoubleClick={() => setEditing(true)} style={{ minHeight: 28 }}>
      {String(edited[column.key] ?? row[column.key] ?? "")}
    </div>
  );
}
