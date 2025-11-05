# Dynamic Data Table Manager

**Built with:** Next.js 14 (App Router) + Redux Toolkit + Material UI (MUI) + TypeScript

---

## 📍 Objective
A dynamic, customizable data table with import/export, searching, sorting, inline editing, and persistent settings — built using real-world logic, not AI-generated boilerplate.

---

## 🚀 Features

### 🧩 Core Features
✅ **Dynamic Table View**
- Displays default columns: `Name`, `Email`, `Age`, `Role`
- Supports sorting (ASC/DESC)
- Global search across all fields  
- Client-side pagination (10 rows per page)

✅ **Manage Columns**
- Add or hide columns dynamically (e.g. Department, Location)
- Checkbox-based column visibility control
- Persists visibility in `localStorage` / Redux Persist

✅ **Import & Export**
- Import `.csv` using **PapaParse**
- Validation for malformed CSVs
- Export visible data to `.csv` (via FileSaver.js)

---

### 🎁 Bonus Features
- Inline row editing (double-click to edit)
- Input validation (e.g., Age must be a number)
- Row actions: Edit / Delete (with confirmation dialog)
- Light/Dark theme toggle (via MUI Theming)
- Fully responsive UI using MUI Grid + Flexbox

---

## 🧱 Tech Stack

| Library | Purpose |
|----------|----------|
| **Next.js 14 (App Router)** | React framework with file-based routing |
| **Redux Toolkit** | State management |
| **Material UI (v5)** | UI components and theming |
| **React Hook Form** | Form management |
| **PapaParse** | CSV parsing |
| **FileSaver.js / Blob** | File export |
| **Redux Persist** | Save column & theme preferences |
| **TypeScript** | Type safety |

---

## 🧰 Folder Structure

src/
├── app/
│ ├── layout.tsx
│ ├── page.tsx
├── components/
│ ├── DataTable.tsx
│ ├── ManageColumnsModal.tsx
│ ├── ImportExportButtons.tsx
│ ├── InlineEditRow.tsx
├── store/
│ ├── index.ts
│ ├── slices/
│ │ ├── dataSlice.ts
│ │ ├── uiSlice.ts
├── theme/
│ └── theme.ts
├── styles/
│ └── globals.css

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the project
```bash
git clone https://github.com/yourusername/dynamic-data-table-manager.git
cd dynamic-data-table-manager
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Run the development server
bash
Copy code
npm run dev
Visit 👉 http://localhost:3000

💡 Notes
Theme preference (light/dark) is stored in localStorage.

Column visibility is persisted across reloads.

CSV import supports UTF-8 encoded .csv files.

CSV export only includes visible columns.

🧠 Author
By Ambar Ubale 🚀
