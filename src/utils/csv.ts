import Papa from "papaparse";
import { Row } from "../types";
import { saveAs } from "file-saver";

export function parseCSV(text: string): { rows: Row[]; errors?: string[] } {
  const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true });
  const errors: string[] = [];
  if (parsed.errors.length) {
    parsed.errors.forEach(e => errors.push(e.message));
    return { rows: [], errors };
  }
  const rows: Row[] = parsed.data.map((r: any) => ({
    id: r.id || undefined,
    ...r
  })) as Row[];
  return { rows, errors };
}

export function exportCSV(rows: Row[], columns: string[], filename = "export.csv") {
  const headers = columns;
  const csv = Papa.unparse(
    rows.map(r =>
      headers.reduce((acc, key) => {
        acc[key] = r[key] ?? "";
        return acc;
      }, {} as Record<string, any>)
    )
  );
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
}
