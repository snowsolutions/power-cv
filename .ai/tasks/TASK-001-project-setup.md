# TASK-001: Project Setup & Initialization

**Status**: PENDING
**Priority**: HIGH
**Phase**: 1 - Core Functionality
**Estimated Time**: 30-45 minutes

---

## 📋 Description

Initialize the Power CV project structure with both frontend (React) and backend (Node.js) applications. Set up version control, create directory structure, and configure basic project files.

---

## 🎯 Objectives

1. Create root project structure
2. Initialize Git repository
3. Set up React frontend with Vite
4. Set up Node.js backend with Express
5. Create .gitignore file
6. Initialize package.json for both client and server
7. Create README.md with project overview

---

## 📝 Acceptance Criteria

- [ ] Project directory structure matches the plan
- [ ] Client folder exists with Vite + React setup
- [ ] Server folder exists with Node.js structure
- [ ] Git repository initialized with proper .gitignore
- [ ] README.md created with basic project information
- [ ] Both client and server have package.json files
- [ ] No errors when running `npm install` in both directories
- [ ] Dev servers can start without errors (even if showing default pages)

---

## 🛠️ Implementation Steps

### 1. Create Project Structure
```
power-cv/
├── client/          # React frontend
├── server/          # Node.js backend
├── .ai/            # AI documentation (already exists)
├── .gitignore
└── README.md
```

### 2. Initialize Git Repository
```bash
git init
```

### 3. Setup Frontend (Client)
```bash
cd client
npm create vite@latest . -- --template react
npm install
```

### 4. Setup Backend (Server)
```bash
cd server
npm init -y
npm install express cors dotenv mongoose express-validator morgan
npm install -D nodemon
```

### 5. Create .gitignore
Include:
- node_modules/
- .env
- dist/
- build/
- .DS_Store
- *.log

### 6. Create Basic Server Structure
```
server/
├── src/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── package.json
└── .env.example
```

### 7. Update package.json Scripts
**Client**: Ensure dev, build, preview scripts exist
**Server**: Add "start" and "dev" scripts with nodemon

---

## 🧪 Testing Instructions

### For User to Test:

1. **Verify Directory Structure**
   - Open the project folder
   - Confirm `client/` and `server/` directories exist
   - Check that `.ai/` folder with existing files is still there

2. **Test Frontend Setup**
   - Navigate to `client/` directory
   - Run `npm install` (should complete without errors)
   - Run `npm run dev` (should start Vite dev server)
   - Open browser to displayed URL (usually http://localhost:5173)
   - Should see default Vite + React welcome page

3. **Test Backend Setup**
   - Navigate to `server/` directory
   - Run `npm install` (should complete without errors)
   - Check that `src/` folder structure exists
   - Verify package.json has correct scripts

4. **Verify Git Setup**
   - Run `git status` in root directory
   - Should show git is initialized
   - Check `.gitignore` exists and includes node_modules, .env

5. **Check Documentation**
   - Open `README.md`
   - Should contain project name, description, and basic setup instructions

---

## 📦 Deliverables

- [x] Project directory structure created
- [x] Git repository initialized
- [x] Frontend (client) with Vite + React
- [x] Backend (server) with basic structure
- [x] .gitignore file
- [x] README.md file
- [x] package.json for both client and server

---

## 🔗 Dependencies

**Before**: None (this is the first task)
**After**: TASK-002 (Backend Server Setup)

---

## 📌 Notes

- Keep the .ai folder and all its contents intact
- Use Vite instead of Create React App for faster builds
- Server structure should follow MVC pattern
- Ensure .env.example is created but .env is gitignored

---

## ⚠️ Potential Issues

1. **Port conflicts**: Default ports (5173 for Vite, 5000 for server) might be in use
2. **npm version**: Ensure npm and node are up to date
3. **Windows vs Unix**: Path separators and line endings might differ

---

## ✅ Definition of Done

- User has tested all steps above
- Both client and server can be installed without errors
- Frontend dev server starts and shows default React page
- Git repository is initialized
- User confirms: "Everything works, ready to move to next task"