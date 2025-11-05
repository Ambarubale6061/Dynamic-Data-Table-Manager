"use client";
import React from "react";
import Container from "@mui/material/Container";
import DataTable from "../components/DataTable";
import ManageColumnsModal from "../components/ManageColumnsModal";
import ImportExport from "../components/ImportExport";
import ThemeToggle from "../components/ThemeToggle";
import { Box, Stack, Button } from "@mui/material";

export default function Page() {
  const [openCols, setOpenCols] = React.useState(false);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mb={2} spacing={2}>
        <h1 style={{ margin: 0 }}>Dynamic Data Table Manager</h1>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <ThemeToggle />
          <Button variant="contained" onClick={() => setOpenCols(true)}>Manage Columns</Button>
        </Box>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={2}>
        <ImportExport />
      </Stack>

      <DataTable />
      <ManageColumnsModal open={openCols} onClose={() => setOpenCols(false)} />
    </Container>
  );
}
