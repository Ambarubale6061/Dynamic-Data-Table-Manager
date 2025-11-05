"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { tableActions } from "../store/tableSlice";
import { parseCSV, exportCSV } from "../utils/csv";
import { Button } from "@mui/material";

export default function ImportExport() {
  const dispatch = useDispatch();
  const rows = useSelector((s: RootState) => s.table.rows);
  const columns = useSelector((s: RootState) => s.table.columns);
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const { rows: parsed, errors } = parseCSV(text);
      if (errors && errors.length) {
        alert("CSV parse errors:\n" + errors.join("\n"));
        return;
      }
      const prepared = parsed.map((r, idx) => ({ id: r.id || `import-${Date.now()}-${idx}`, ...r }));
      dispatch(tableActions.setRows(prepared));
    };
    reader.readAsText(f);
  }

  function handleExport() {
    const visibleKeys = columns.filter(c => c.visible).map(c => c.key);
    exportCSV(rows, visibleKeys);
  }

  return (
    <>
      <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleFileChange} />
      <Button variant="outlined" onClick={() => fileRef.current?.click()}>Import CSV</Button>
      <Button variant="contained" sx={{ ml: 1 }} onClick={handleExport}>Export CSV</Button>
    </>
  );
}
