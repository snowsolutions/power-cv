# Power CV - Professional CV Builder

A full-stack web application for creating, managing, and exporting professional CVs with multiple templates. Built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Interactive Form Builder**: Easy-to-use forms for all CV sections
- **Real-time Preview**: See your CV update as you type
- **Multiple Templates**: Choose from various professional templates
- **PDF Export**: Download your CV as a PDF
- **JSON Import/Export**: Save and load CV data
- **Responsive Design**: Works on desktop and mobile devices
- **Section Customization**: Customize section titles to your preference

## 📋 CV Sections

- Personal Information (name, email, phone, address, avatar)
- Introduction (rich text editor)
- Work History (multiple entries)
- Certifications (with expiration dates)
- Education (multiple entries)
- Activities
- Professional Skills (with proficiency levels)
- Language Competencies

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **React Hook Form** - Form management
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client
- **jsPDF + html2canvas** - PDF generation
- **React Quill** - Rich text editor

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **Docker** - Containerization
- **CORS** - Cross-origin resource sharing
- **Express Validator** - Input validation

## 📁 Project Structure

```
power-cv/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── context/       # Context providers
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── models/        # Database models
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── utils/         # Utility functions
│   └── package.json
│
└── .ai/                    # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher) - `npm install -g pnpm`
- **Docker** and **Docker Compose** - For PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd power-cv
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Start PostgreSQL with Docker**
   
   From the project root:
   ```bash
   docker-compose up -d
   ```

5. **Setup Prisma and Database**
   
   ```bash
   cd server
   pnpm exec prisma generate
   pnpm exec prisma migrate dev --name init
   ```

6. **Configure Environment Variables**
   
   Environment files are already created. Verify `server/.env`:
   ```env
   PORT=5001
   DATABASE_URL="postgresql://power_cv_user:power_cv_password@localhost:5432/power_cv?schema=public"
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

### Running the Application

1. **Start PostgreSQL** (if not already running)
   ```bash
   docker-compose up -d
   ```

2. **Start the Backend Server**
   ```bash
   cd server
   pnpm run dev
   ```
   Server will run on http://localhost:5001

3. **Start the Frontend Development Server**
   ```bash
   cd client
   pnpm run dev
   ```
   Application will run on http://localhost:5173

4. **Open your browser**
   Navigate to http://localhost:5173

5. **Optional: Access pgAdmin** (Database GUI)
   Navigate to http://localhost:5050
   - Email: `admin@powercv.local`
   - Password: `admin`

## 📝 API Endpoints

### CV Management
- `GET /api/cvs` - Get all CVs
- `GET /api/cvs/:id` - Get CV by ID
- `POST /api/cvs` - Create new CV
- `PUT /api/cvs/:id` - Update CV
- `DELETE /api/cvs/:id` - Delete CV
- `POST /api/cvs/import` - Import CV from JSON
- `GET /api/cvs/:id/export` - Export CV as JSON

### Health Check
- `GET /api/health` - Server health check

## 🧪 Development

### Frontend Development
```bash
cd client
pnpm run dev      # Start dev server
pnpm run build    # Build for production
pnpm run preview  # Preview production build
```

### Backend Development
```bash
cd server
pnpm run dev              # Start with nodemon
pnpm start                # Start production server
pnpm run prisma:studio    # Open Prisma Studio (DB GUI)
pnpm run prisma:migrate   # Run database migrations
```

### Docker Commands
```bash
docker-compose up -d      # Start PostgreSQL
docker-compose down       # Stop PostgreSQL
docker-compose logs       # View logs
```

## 📦 Building for Production

1. **Build Frontend**
   ```bash
   cd client
   pnpm run build
   ```

2. **Prepare Backend**
   ```bash
   cd server
   pnpm run db:setup  # Generate Prisma Client and run migrations
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who help improve this project

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

## 🗺️ Roadmap

- [x] Basic CV creation and editing
- [x] Template system
- [x] PostgreSQL database with Prisma
- [x] Docker containerization
- [ ] PDF export
- [ ] User authentication
- [ ] Cloud storage integration
- [ ] AI-powered content suggestions
- [ ] Collaborative editing
- [ ] Template marketplace
- [ ] Multi-language support

## 📊 Project Status

Current Version: 1.0.0
Status: In Development

---

**Built with ❤️ using React and Node.js**