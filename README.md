# 💼 Job Portal — Frontend Assessment

A modern and responsive **Job Portal Dashboard** built with **React, TypeScript, Vite, TanStack Router, Zustand, Fluent UI, and CSS**.

The application allows users to:

- 💼 View job opportunities
- 🔎 Search jobs by title or company
- 📋 Track job applications
- 📊 View application statistics
- 🏷️ Filter applications by status
- 👀 View detailed application information
- 🔄 Update application status
- 🗑️ Remove applications
- 🧠 Manage job/application state using Zustand
- 🔗 Use URL search parameters for job searching
- 🧭 Navigate through the application using TanStack Router

---

## 🚀 Live Demo

**Live Application:**

👉 **[View Live Application](https://onedata-frontend-assessment.vercel.app/)**

---

## 🔗 GitHub Repository

👉 **[View Source Code](https://github.com/sudhar04/OneData-Frontend-Assessment)**

---

# 📌 Project Overview

The **Job Portal** is designed as a centralized dashboard for managing job opportunities and job applications.

The dashboard provides an overview of the user's application activity and displays important statistics such as:

- 📊 Total Applications
- 🔍 Applications Under Review
- 💬 Interviews
- ✅ Selected Applications
- ❌ Rejected Applications

The application also provides a **Job Opportunities** section where users can search and explore available jobs.

The **Application Tracker** allows users to:

- 🔎 Search applications
- 🏷️ Filter applications
- 🔄 Change application status
- 👀 View application details
- 🗑️ Remove applications
- 🧹 Clear applications

---

# 🛠️ Tech Stack

## ⚛️ Frontend

- React.js
- TypeScript
- Vite
- TanStack Router
- Zustand
- Fluent UI
- Lucide React
- CSS

## 🧠 State Management

- Zustand

Zustand is used to manage:

- 💼 Job data
- 📋 Application data
- 🏷️ Application status
- 🎯 Selected application state

## 🧭 Routing

- TanStack Router
- TanStack File-Based Routing

## 🎨 UI

- Fluent UI
- Lucide React Icons
- Custom CSS
- Responsive layouts

## 🧰 Development Tools

- Visual Studio Code
- npm
- Git
- GitHub
- Vite

---

# ✨ Main Features

## 1. 🏠 Dashboard

The dashboard provides a quick overview of the user's job search.

It includes:

- 👋 Welcome section
- 📊 Application statistics
- 💼 Job opportunities
- 📋 My applications

---

## 2. 📊 Application Statistics

The dashboard displays application statistics using visual cards.

### 📈 Statistics

| Status | Description |
|---|---|
| 📋 Total Applications | Total number of applications |
| 🔍 Under Review | Applications currently being reviewed |
| 💬 Interviews | Applications that reached the interview stage |
| ✅ Selected | Successfully selected applications |
| ❌ Rejected | Rejected applications |


# 🗂️ Project Structure

The project follows a clean and component-based React architecture.

```text
job-portal/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   ├── application/
│   │   │   ├── ApplicationDetailsModal.tsx
│   │   │   └── ApplicationList.tsx
│   │   │   └── ApplicationModal.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── ApplicationStats.tsx
│   │   │   └── Dashboard.tsx
│   │   │
│   │   └── jobs/
│   │       ├── JobList.tsx
│   │       └── JobCard.tsx
│   │
│   ├── routes/
│   │   └── index.tsx
│   │   └── __root.tsx
│   │
│   ├── data/
│   │   └── jobs.tsx
│   │
│   │
│   ├── Types/
│   │   └── job.tsx
│   │   └── application.tsx
│   │
│   ├── store/
│   │   ├── applicationStore.ts
│   │   └── jobStore.ts
│   │
│   ├── index.css
│   │
│   └── main.tsx
│
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```


# 🔄 Application Flow

The general application flow is:

```text
👤 User opens Dashboard
          ↓
🏠 Dashboard loads
          ↓
📊 Application statistics are displayed
          ↓
💼 User browses Job Opportunities
          ↓
🔎 User searches for a job
          ↓
👀 User selects / views a job
          ↓
📋 User tracks the application
          ↓
📥 Application appears in My Applications
          ↓
🏷️ User updates application status
          ↓
🔍 User opens Application Details
          ↓
📄 Application information is displayed
```

---

## 🔎 Job Search Flow

```text
👤 User enters search text
          ↓
🔗 Search parameter is updated
          ↓
🌐 URL becomes:

/?search=react

          ↓
📋 JobList reads search parameter
          ↓
🔎 Jobs are filtered
          ↓
💼 Matching jobs are displayed
```

# ⚙️ Installation

Follow the steps below to run the Job Portal project locally.

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/sudhar04/OneData-Frontend-Assessment.git
```

---

## 2️⃣ Navigate to the Project

```bash
cd OneData-Frontend-Assessment
```

If the frontend application is inside a subfolder such as `job-portal`, use:

```bash
cd job-portal
```

---

## 3️⃣ Install Dependencies

Install all required npm packages:

```bash
npm install
```

---

## 4️⃣ Start the Development Server

Run the Vite development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 🌐 Open the Application

Open the URL displayed in your terminal after running:

```bash
npm run dev
```

Example:

```text
http://localhost:5173
```

---

## 🏗️ Build for Production

Create an optimized production build:

```bash
npm run build
```

---

## 👀 Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

---

## 🔍 Run Linter

Check the project for linting issues:

```bash
npm run lint
```

---

## 🚀 Quick Start

You can use the following commands for a fresh setup:

```bash
git clone https://github.com/sudhar04/OneData-Frontend-Assessment.git
cd OneData-Frontend-Assessment
npm install
npm run dev
```

# 🧪 Development Commands

## ▶️ Start Development Server

```bash
npm run dev
```

The development server will normally run at:

```text
http://localhost:5173
```

---

## 🏗️ Build Production Version

```bash
npm run build
```

The production build will be generated inside the:

```text
dist/
```

directory.

---

## 👀 Preview Production Build

```bash
npm run preview
```

This allows you to preview the production build locally.

---

## 🔍 Run ESLint

```bash
npm run lint
```

This checks the project for linting issues.

# 📦 Git Commands

## 🆕 Initialize Git Repository

```bash
git init
```

## 🔗 Add GitHub Remote

```bash
git remote add origin https://github.com/sudhar04/OneData-Frontend-Assessment.git
```

## 🌿 Rename Current Branch to Main

```bash
git branch -M main
```

## ➕ Add All Files

```bash
git add .
```

## 💾 Create Initial Commit

```bash
git commit -m "Initial commit"
```

## 🚀 Push to GitHub

```bash
git push -u origin main
```

## 🔍 Check Git Status

```bash
git status
```

## 🌐 Check Remote URL

```bash
git remote -v
```

## 🌿 Check Branch

```bash
git branch
```

## 🌱 Create Feature Branch

```bash
git checkout -b feature/job-search
```

## 🔄 Switch Branch

```bash
git checkout main
```

## ⬇️ Pull Latest Changes

```bash
git pull origin main
```

## 📜 View Commit History

```bash
git log --oneline
```

## 🗑️ Remove a Remote

```bash
git remote remove origin
```

# 🔄 Complete Git Workflow

After making changes to the project, use the following workflow:

## 1️⃣ Check Git Status

```bash
git status
```

## 2️⃣ Add Changes

```bash
git add .
```

## 3️⃣ Commit Changes

```bash
git commit -m "Update job portal UI"
```

## 4️⃣ Push Changes

```bash
git push origin main
```

### ⚡ Complete Workflow

```bash
git status
git add .
git commit -m "Update job portal UI"
git push origin main
```

This workflow can be used whenever you make changes to the project and want to push them to GitHub.

# 🔍 Useful Git Commands

## 📊 Check Git Status

```bash
git status
```

## 🌐 Check Remote Repository

```bash
git remote -v
```

## 🌿 Check Current Branch

```bash
git branch
```

## 🌱 Create a New Branch

```bash
git checkout -b feature/job-search
```

## 🔄 Switch Branch

```bash
git checkout main
```

## ⬇️ Pull Latest Changes

```bash
git pull origin main
```

## 📜 View Commit History

```bash
git log --oneline
```

## ➕ Add All Changes

```bash
git add .
```

## 💾 Commit Changes

```bash
git commit -m "Update job portal UI"
```

## 🚀 Push Changes

```bash
git push origin main
```

# 🛠️ Troubleshooting

## ⚠️ Port Already In Use

If port `5173` is already being used, stop the existing Vite server and run:

```bash
npm run dev
```

Vite may automatically select another available port.

---

## 📦 Dependency Installation Error

If you encounter dependency installation issues, try removing `node_modules` and `package-lock.json`, then reinstall the dependencies.

### 🪟 Windows PowerShell

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### 🐧 macOS / Linux

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## ❌ Git Push Rejected

If Git displays a `non-fast-forward` error:

```text
rejected
non-fast-forward
```

First pull the latest changes using rebase:

```bash
git pull --rebase origin main
```

Then push your changes:

```bash
git push origin main
```

If merge conflicts occur, resolve the conflicts and then run:

```bash
git add .
git rebase --continue
```

Finally:

```bash
git push origin main
```
