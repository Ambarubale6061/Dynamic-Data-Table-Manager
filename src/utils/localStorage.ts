export function loadColumnsFallback() {
  try {
    const raw = localStorage.getItem("ddtm_columns");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}
