# CoursePathAI Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 12+
- Firebase account
- OpenAI API key (optional for AI features)

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd coursepath-ai
npm install
```

### 2. Environment Setup

Copy the environment template:
```bash
cp .env.example .env
```

Fill in your configuration in `.env`:

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/coursepath_ai
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=coursepath_ai

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
# ... (see .env.example for complete list)

# OpenAI API
OPENAI_API_KEY=sk-your_openai_api_key

# Application Settings
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

Start PostgreSQL and create the database:
```bash
createdb coursepath_ai
```

Initialize tables:
```bash
npm run db:setup
```

### 4. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run dev:frontend  # Runs on http://localhost:3000
npm run dev:backend   # Runs on http://localhost:5000
```

## 📁 Project Structure

```
coursepath-ai/
├── frontend/          # React TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts (Auth, etc.)
│   │   ├── services/      # API service layer
│   │   ├── config/        # Configuration files
│   │   └── utils/         # Utility functions
│   ├── public/
│   └── package.json
├── backend/           # Node.js Express API
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── config/        # Database & app config
│   │   ├── utils/         # Backend utilities
│   │   └── server.ts      # Express app entry point
│   └── package.json
├── shared/            # Shared TypeScript types and utilities
│   ├── src/
│   │   ├── types.ts       # Shared type definitions
│   │   ├── utils.ts       # Shared utility functions
│   │   └── constants.ts   # Shared constants
│   └── package.json
├── database/          # Database schemas and migrations
├── docs/              # Documentation
├── docker-compose.yml # Development environment
└── package.json       # Root workspace configuration
```

## 🛠️ Development

### Frontend Development

The frontend is built with:
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for server state management
- **Zustand** for client state management
- **Firebase Auth** for authentication

Key files:
- `frontend/src/App.tsx` - Main app component
- `frontend/src/contexts/AuthContext.tsx` - Authentication context
- `frontend/src/services/api.ts` - API service layer
- `frontend/src/pages/` - Page components

### Backend Development

The backend is built with:
- **Node.js & Express** with TypeScript
- **PostgreSQL** with raw SQL queries
- **Firebase Admin** for auth verification
- **OpenAI API** for AI features
- **Winston** for logging

Key files:
- `backend/src/server.ts` - Express app setup
- `backend/src/routes/` - API route handlers
- `backend/src/config/database.ts` - Database configuration
- `backend/src/middleware/auth.ts` - Authentication middleware

### Database Schema

Main tables:
- `users` - User profiles and account info
- `schools` - University/college information
- `departments` - Academic departments
- `courses` - Course catalog
- `professors` - Professor information
- `academic_paths` - User's graduation plans
- `user_courses` - Course enrollment tracking
- `jobs` - Job/internship listings
- `bookmarks` - User saved items
- `career_advice` - AI assistance history

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend
- `npm run build` - Build both applications
- `npm run test` - Run all tests
- `npm run lint` - Lint all workspaces

### Frontend (`npm run <script> --workspace=frontend`)
- `start` - Start development server
- `build` - Build for production
- `test` - Run tests
- `lint` - Lint frontend code

### Backend (`npm run <script> --workspace=backend`)
- `dev` - Start with nodemon
- `build` - Compile TypeScript
- `start` - Start production server
- `db:setup` - Initialize database
- `db:migrate` - Run migrations
- `db:seed` - Seed test data

## 🐳 Docker Development

For a complete development environment with PostgreSQL:

```bash
npm run docker:dev
```

This starts:
- PostgreSQL database
- Redis (for caching)
- Backend API server
- Frontend development server

## 🧪 Testing

Run tests across all workspaces:
```bash
npm test
```

Individual workspace testing:
```bash
npm run test --workspace=frontend
npm run test --workspace=backend
```

## 📝 API Documentation

### Authentication
All protected routes require a Firebase ID token in the Authorization header:
```
Authorization: Bearer <firebase-id-token>
```

### Core Endpoints

#### Auth
- `POST /api/auth/register` - Register/update user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

#### Courses
- `GET /api/courses` - List courses with filters
- `GET /api/courses/:id` - Get course details

#### Jobs
- `GET /api/jobs/search` - Search jobs with filters
- `GET /api/jobs/:id` - Get job details
- `GET /api/jobs/:id/skills-match` - Get skills match analysis

#### Academic Paths
- `GET /api/paths` - Get user's academic path
- `POST /api/paths` - Create/update academic path
- `POST /api/paths/courses` - Add course to path
- `PUT /api/paths/courses/:id` - Update course in path

#### AI Assistant
- `POST /api/ai/resume-help` - Generate resume suggestions
- `POST /api/ai/interview-prep` - Generate interview questions
- `POST /api/ai/certifications` - Get certification recommendations
- `GET /api/ai/history` - Get AI assistance history

#### Bookmarks
- `GET /api/bookmarks` - Get user bookmarks
- `POST /api/bookmarks` - Add bookmark
- `DELETE /api/bookmarks/:id` - Remove bookmark

## 🚀 Deployment

### Environment Variables for Production

Ensure these are set in your production environment:
- `NODE_ENV=production`
- `DATABASE_URL` - PostgreSQL connection string
- `FIREBASE_*` - Firebase configuration
- `OPENAI_API_KEY` - OpenAI API key
- `JWT_SECRET` - Strong random secret

### Build Commands

```bash
# Build both frontend and backend
npm run build

# Build individually
npm run build --workspace=frontend
npm run build --workspace=backend
```

### Database Migration

```bash
npm run db:migrate --workspace=backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting (Prettier)
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## 🐛 Troubleshooting

### Common Issues

1. **Database connection error**
   - Ensure PostgreSQL is running
   - Check DATABASE_URL in .env
   - Verify database exists: `createdb coursepath_ai`

2. **Firebase authentication error**
   - Verify Firebase configuration in .env
   - Check Firebase project settings
   - Ensure Firebase Auth is enabled

3. **Module resolution errors**
   - Delete node_modules and package-lock.json
   - Run `npm install` again
   - Check that @coursepath-ai/shared is built

4. **Port already in use**
   - Change PORT in .env
   - Kill process using port: `lsof -ti:3000 | xargs kill -9`

### Getting Help

- Check existing GitHub issues
- Create a new issue with detailed description
- Include error logs and steps to reproduce
