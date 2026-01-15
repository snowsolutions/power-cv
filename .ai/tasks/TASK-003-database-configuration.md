# TASK-003: Database Configuration

**Status**: PENDING
**Priority**: HIGH
**Phase**: 1 - Core Functionality
**Estimated Time**: 30-45 minutes

---

## 📋 Description

Set up MongoDB database connection and create the CV data model. Configure Mongoose ODM, establish database connectivity, and implement the schema for storing CV data according to the project specifications.

---

## 🎯 Objectives

1. Install and configure MongoDB (or use MongoDB Atlas)
2. Create database configuration file
3. Establish MongoDB connection
4. Create CV model with Mongoose schema
5. Add database connection to server startup
6. Test database connectivity
7. Handle connection errors gracefully

---

## 📝 Acceptance Criteria

- [ ] MongoDB is running (locally or Atlas cloud)
- [ ] Database connection established successfully
- [ ] CV model created with correct schema structure
- [ ] Server connects to database on startup
- [ ] Connection success/error messages logged
- [ ] Database connection errors are handled gracefully
- [ ] Mongoose deprecation warnings are suppressed
- [ ] Can create a test CV document in database

---

## 🛠️ Implementation Steps

### 1. MongoDB Setup (Choose One)

**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/power-cv`

**Option B: MongoDB Atlas (Cloud)**
- Create free account at mongodb.com/atlas
- Create cluster
- Get connection string
- Update MONGODB_URI in .env

### 2. Create Database Configuration

**File**: `server/src/config/database.js`
- Import mongoose
- Create connectDB function
- Configure mongoose options
- Handle connection events (connected, error, disconnected)
- Export connectDB function

### 3. Create CV Model

**File**: `server/src/models/CV.js`

Schema structure:
```javascript
{
  name: String (required),
  template: String (default: "modern"),
  data: {
    personalInfo: {
      sectionTitle: String,
      name: String,
      email: String,
      phone: String,
      address: String,
      avatar: String
    },
    introduction: {
      sectionTitle: String,
      content: String
    },
    workHistory: {
      sectionTitle: String,
      items: Array
    },
    certifications: {
      sectionTitle: String,
      items: Array
    },
    educations: {
      sectionTitle: String,
      items: Array
    },
    activities: {
      sectionTitle: String,
      items: Array
    },
    professionalSkills: {
      sectionTitle: String,
      items: Array
    },
    languageCompetencies: {
      sectionTitle: String,
      items: Array
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Integrate Database Connection

**Update**: `server/src/server.js`
- Import connectDB function
- Call connectDB before starting server
- Handle connection errors

### 5. Add Timestamps

- Use Mongoose timestamps option
- Automatically manage createdAt and updatedAt

---

## 🧪 Testing Instructions

### For User to Test:

1. **Verify MongoDB is Running**
   - **Local MongoDB**: Run `mongosh` or check MongoDB Compass
   - **MongoDB Atlas**: Login to Atlas dashboard, verify cluster is running

2. **Update Environment Variables**
   - Open `server/.env`
   - Verify MONGODB_URI is correct
   - For local: `mongodb://localhost:27017/power-cv`
   - For Atlas: Use connection string from Atlas (with username/password)

3. **Start the Server**
   - Run `npm run dev` in server directory
   - Watch console for database connection messages
   - Should see: "MongoDB Connected: [host]" or similar
   - Should NOT see connection errors

4. **Verify Database Connection**
   - Check console logs for successful connection
   - No error messages about database
   - Server should continue running without crashes

5. **Test with MongoDB Tools (Optional but Recommended)**
   - **MongoDB Compass**: Connect and verify `power-cv` database exists
   - **mongosh**: Run `use power-cv` then `show collections`
   - Should see `cvs` collection (may be empty)

6. **Test Model Creation (Optional)**
   - Can temporarily add test code to create a sample CV
   - Verify it saves to database
   - Check in Compass or mongosh

---

## 📦 Deliverables

- [x] server/src/config/database.js - Database connection configuration
- [x] server/src/models/CV.js - CV Mongoose model
- [x] Updated server.js with database connection
- [x] MongoDB running (local or cloud)
- [x] Successful database connection on server start

---

## 🔗 Dependencies

**Before**: TASK-002 (Backend Server Setup)
**After**: TASK-019 (Backend CV CRUD APIs)

---

## 📌 Notes

- Use Mongoose v8.x (already in package.json from TASK-001)
- Set `strictQuery: false` to avoid deprecation warnings
- Use unified topology for MongoDB connection
- Store sensitive connection strings in .env, never hardcode
- Consider adding indexes for performance (optional for now)

---

## 🔍 Schema Details

### Data Field Structure

Each section in the CV data should be flexible to accommodate the JSON structure from plan.md:

- **personalInfo**: Single object with fields
- **introduction**: Single object with sectionTitle and content
- **workHistory**: Object with sectionTitle and items array
- **certifications**: Object with sectionTitle and items array
- **educations**: Object with sectionTitle and items array
- **activities**: Object with sectionTitle and items array
- **professionalSkills**: Object with sectionTitle and items array
- **languageCompetencies**: Object with sectionTitle and items array

Use Schema.Types.Mixed or detailed nested schemas for flexibility.

---

## ⚠️ Potential Issues

1. **Connection string format**: Ensure proper format with credentials if using Atlas
2. **Firewall/Network**: MongoDB Atlas requires IP whitelist (use 0.0.0.0/0 for testing)
3. **Authentication failed**: Double-check username/password in connection string
4. **Deprecation warnings**: Configure mongoose options to suppress warnings
5. **Port 27017 in use**: Change port if running multiple MongoDB instances

---

## 🔒 Security Considerations

- Never commit .env file with real credentials
- Use strong passwords for MongoDB Atlas
- Whitelist only necessary IP addresses in production
- Use environment variables for all sensitive data

---

## 🎨 Code Quality Checklist

- [ ] Database connection has error handling
- [ ] Schema matches data model in plan.md
- [ ] Timestamps are enabled
- [ ] Connection success/failure is logged
- [ ] Code is well-commented
- [ ] No hardcoded credentials

---

## 📚 Reference

See plan.md section "Data Model > CV JSON Structure" for complete schema specification.

---

## ✅ Definition of Done

- MongoDB is connected and running
- CV model is created with correct schema
- Server starts and connects to database without errors
- Console shows successful database connection message
- Database exists and is accessible via MongoDB tools
- User confirms: "Database is connected, ready for next task"