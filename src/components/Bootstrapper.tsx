"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { tableActions } from "../store/tableSlice";

export default function Bootstrapper() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    try {
      const cols = localStorage.getItem("ddtm_columns");
      if (cols) dispatch(tableActions.setColumns(JSON.parse(cols)));
    } catch {}
    try {
      const dark = localStorage.getItem("ddtm_dark") === "1";
      if (dark) dispatch(tableActions.toggleDarkMode());
    } catch {}
  }, [dispatch]);
  return null;
}
