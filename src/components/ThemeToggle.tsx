"use client";
import { Switch } from "@mui/material";
import React from "react";

export default function ThemeToggle() {
  const [dark, setDark] = React.useState(typeof window !== "undefined" && localStorage.getItem("ddtm_dark") === "1");

  function toggle() {
    const nd = !dark;
    setDark(nd);
    localStorage.setItem("ddtm_dark", nd ? "1" : "0");
    // lightweight way to update theme: reload
    window.location.reload();
  }

  return <Switch checked={dark} onChange={toggle} />;
}
