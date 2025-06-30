# CoursePathAI – Smart Academic & Career Planner for Students

🧠 **A personalized academic and career planning platform** that helps college students visualize their graduation path, explore course options with GPA and professor data, and find internships or jobs relevant to their major — all in one place.

## 🎯 Target Users
- College students (especially STEM majors)
- Incoming freshmen mapping 4-year plans
- Career-switching students
- Universities looking to improve advising outcomes

## 🚀 Core Features

### 1. Academic Path Planner
- Visual flowchart of required + elective courses
- Semester-by-semester planning with credit hour tracking
- Prerequisite validation and smart course sequencing
- Integration with course ratings and professor reviews

### 2. Course Insights
- GPA distribution analysis per course and professor
- Aggregated student reviews and difficulty ratings
- Course tags: "project-heavy", "theoretical", "math-intensive"
- Real-time enrollment and waitlist information

### 3. Real-Time Job & Internship Feed
- Live job data from Adzuna, Remotive, and other APIs
- Smart filtering by major, skills, graduation date, location
- Skills gap analysis based on completed coursework
- Application tracking and deadline management

### 4. AI Career Assistant
- Personalized resume optimization suggestions
- Interview preparation tailored to your courses
- Certification and skill development recommendations
- Career path analysis and goal setting

### 5. Professor & Course Discovery
- Comprehensive professor ratings and reviews
- Course difficulty and workload analysis
- Schedule optimization for balanced semesters
- Integration with RateMyProfessors data

### 6. Export & Progress Tracking
- Downloadable 4-year graduation plans
- Job and course bookmarking system
- Progress tracking toward degree requirements
- Academic and career milestone alerts

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, React Router, React Query |
| **Backend** | Node.js, Express, TypeScript, PostgreSQL, Redis |
| **Authentication** | Firebase Auth (Google OAuth, Email/Password) |
| **Database** | PostgreSQL with connection pooling, Redis for caching |
| **External APIs** | OpenAI GPT-4, Adzuna Jobs API, Remotive, RateMyProfessors |
| **Development** | Docker, ESLint, Prettier, Jest, Supertest |
| **Deployment** | Vercel (Frontend), Railway/Render (Backend), Nginx |
| **Monitoring** | Winston logging, Error tracking, Performance monitoring |

## 📁 Project Structure

```
coursepath-ai/
├── frontend/                # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components  
│   │   ├── pages/          # Main application pages
│   │   ├── contexts/       # React context providers
│   │   ├── services/       # API communication layer
│   │   └── config/         # Configuration files
├── backend/                # Node.js Express API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic layer
│   │   ├── migrations/     # Database migrations
│   │   └── config/         # Server configuration
├── shared/                 # Shared TypeScript types and utilities
│   ├── src/
│   │   ├── types.ts        # Common type definitions
│   │   ├── utils.ts        # Shared utility functions
│   │   └── constants.ts    # Application constants
├── scripts/               # Build and deployment scripts
├── docs/                  # Documentation and guides
└── docker-compose.yml     # Development environment
```

## 🚀 Quick Start

1. **Clone and setup:**
   ```bash
   git clone https://github.com/your-org/coursepath-ai.git
   cd coursepath-ai
   ./scripts/setup-dev.sh
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and database credentials
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## � Implementation Status

### ✅ Completed Features

- **Project Setup & Architecture**
  - Monorepo workspace configuration
  - TypeScript setup across all packages
  - Shared types and utilities package
  - Development scripts and tooling

- **Backend API Foundation**
  - Express server with TypeScript
  - PostgreSQL database integration
  - Firebase Authentication middleware
  - Comprehensive database schema
  - API routes for all major features
  - Error handling and logging (Winston)
  - Rate limiting and security headers

- **Frontend Application**
  - React 18 with TypeScript
  - Tailwind CSS styling system
  - React Router for navigation
  - Firebase Auth integration
  - React Query for state management
  - Responsive UI components
  - Authentication flow (Google OAuth + Email)

- **Database & Migrations**
  - Complete PostgreSQL schema
  - Migration system with runner scripts
  - Seed data for development
  - Proper indexing and relationships

- **External Integrations**
  - Job board API service (Adzuna, Remotive)
  - Professor rating service (RateMyProfessors)
  - OpenAI API integration for AI features
  - Comprehensive error handling and fallbacks

- **Development Experience**
  - Docker development environment
  - Automated testing setup
  - ESLint and Prettier configuration
  - Build optimization
  - Development documentation

### 🚧 In Progress

- **Course Planning Logic**
  - Prerequisite validation system
  - Semester planning algorithms
  - GPA calculation and tracking

- **Job Matching Algorithm**
  - Skills extraction from courses
  - Job relevance scoring
  - Personalized recommendations

### ⏳ Planned Features

- **AI-Powered Features**
  - Resume optimization suggestions
  - Interview preparation questions
  - Career path recommendations
  - Course selection AI assistant

- **Advanced UI Components**
  - Interactive course flowchart
  - Drag-and-drop semester planner
  - Data visualization dashboards
  - Real-time notifications

- **Production Features**
  - Comprehensive test coverage
  - Performance monitoring
  - Advanced caching strategies
  - CI/CD pipeline

## 📝 Development Commands
```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend

# Building
npm run build           # Build all packages
npm run build:shared    # Build shared package only

# Database
npm run db:migrate      # Run database migrations
npm run db:reset        # Reset database with fresh data

# Testing
npm run test            # Run all tests
npm run lint            # Check code style
npm run lint:fix        # Fix auto-fixable linting issues

# Docker
npm run docker:dev      # Start development environment
npm run docker:down     # Stop development environment
```

## 🔧 Configuration

### Required Environment Variables

Create a `.env` file with the following variables:

```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/coursepath_ai

# Firebase (get from Firebase Console)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# External APIs
OPENAI_API_KEY=sk-your-openai-api-key
ADZUNA_APP_ID=your-adzuna-app-id
ADZUNA_API_KEY=your-adzuna-api-key

# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### API Keys Setup

1. **Firebase**: Create a Firebase project and download service account credentials
2. **OpenAI**: Get API key from OpenAI platform
3. **Adzuna**: Register for Adzuna developer API access
4. **PostgreSQL**: Install locally or use Docker

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:frontend
npm run test:backend

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📚 Documentation

- [Development Guide](DEVELOPMENT.md) - Detailed setup and development instructions
- [API Documentation](docs/API.md) - Complete API reference
- [Deployment Guide](DEPLOYMENT.md) - Production deployment instructions
- [Contributing Guide](CONTRIBUTING.md) - Guidelines for contributors

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Development workflow
- Code style guidelines
- Testing requirements
- Pull request process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Create an issue for bug reports or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

## 🎯 Roadmap

### Short-term (Next 2-3 months)
- Complete course prerequisite validation
- Enhanced job matching algorithms
- Mobile-responsive improvements
- Performance optimizations

### Medium-term (3-6 months)
- AI-powered career recommendations
- Integration with more universities
- Advanced data visualization
- Mobile app development

### Long-term (6+ months)
- Machine learning for personalization
- Collaborative planning features
- University partnerships
- Enterprise solutions

---

**Built with ❤️ for students navigating their academic and career journey**
