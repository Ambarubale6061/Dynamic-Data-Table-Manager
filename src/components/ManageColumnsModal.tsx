"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { tableActions } from "../store/tableSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  List,
  ListItem,
  IconButton,
  Paper
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, label, visible, onToggle }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <ListItem ref={setNodeRef} style={style} component={Paper} sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', p:1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div {...attributes} {...listeners} style={{ cursor: 'grab', paddingRight: 8 }}>☰</div>
        <div>{label}</div>
      </div>
      <FormControlLabel control={<Checkbox checked={visible} onChange={onToggle} />} label="" />
    </ListItem>
  );
}

export default function ManageColumnsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dispatch = useDispatch();
  const columns = useSelector((s: RootState) => s.table.columns);
  const [newKey, setNewKey] = React.useState("");
  const [newLabel, setNewLabel] = React.useState("");
  const [items, setItems] = React.useState(columns.map(c => c.key));

  React.useEffect(() => setItems(columns.map(c => c.key)), [columns]);

  function toggle(key: string) {
    dispatch(tableActions.toggleColumnVisibility(key));
    const newCols = columns.map(c => (c.key === key ? { ...c, visible: !c.visible } : c));
    localStorage.setItem("ddtm_columns", JSON.stringify(newCols));
    dispatch(tableActions.setColumns(newCols));
  }

  function addColumn() {
    if (!newKey.trim()) return alert("Key required");
    const col = { key: newKey.trim(), label: newLabel || newKey.trim(), visible: true, editable: true };
    const newCols = [...columns, col];
    dispatch(tableActions.setColumns(newCols));
    localStorage.setItem("ddtm_columns", JSON.stringify(newCols));
    setNewKey("");
    setNewLabel("");
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      const newCols = newItems.map(key => columns.find(c => c.key === key)!);
      dispatch(tableActions.setColumns(newCols));
      localStorage.setItem("ddtm_columns", JSON.stringify(newCols));
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <List>
              {items.map(key => {
                const c = columns.find(x => x.key === key)!;
                return (
                  <SortableItem key={c.key} id={c.key} label={`${c.label} (${c.key})`} visible={c.visible} onToggle={() => toggle(c.key)} />
                );
              })}
            </List>
          </SortableContext>
        </DndContext>

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <TextField label="Key (api)" value={newKey} onChange={e => setNewKey(e.target.value)} />
          <TextField label="Label" value={newLabel} onChange={e => setNewLabel(e.target.value)} />
          <IconButton onClick={addColumn} color="primary">
            <AddIcon />
          </IconButton>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
