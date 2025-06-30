# Contributing to CoursePathAI

Thank you for your interest in contributing to CoursePathAI! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git
- Code editor with TypeScript support (VS Code recommended)

### Initial Setup

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/coursepath-ai.git
   cd coursepath-ai
   ```

3. **Set up development environment:**
   ```bash
   npm run setup
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and database credentials
   ```

5. **Start development servers:**
   ```bash
   npm run dev
   ```

### Project Structure

```
coursepath-ai/
├── frontend/          # React TypeScript frontend
├── backend/           # Node.js Express backend
├── shared/            # Shared types and utilities
├── scripts/           # Build and deployment scripts
├── docs/              # Documentation
└── docker-compose.yml # Docker development setup
```

## Development Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Adding tests

Example: `feature/job-recommendation-algorithm`

### Commit Messages

Follow conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(jobs): add job recommendation algorithm
fix(auth): resolve Firebase token validation error
docs(api): update API documentation for courses endpoint
```

### Development Process

1. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes:**
   ```bash
   npm run test
   npm run lint
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Code Style

### TypeScript/JavaScript

We use ESLint and Prettier for code formatting:

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable linting errors
npm run lint:fix
```

**Key principles:**
- Use TypeScript for type safety
- Prefer functional components over class components
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Follow the DRY (Don't Repeat Yourself) principle

### React Components

```typescript
// Good: Functional component with proper typing
interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user)}>Edit</button>
    </div>
  );
};
```

### Backend API

```typescript
// Good: Proper error handling and typing
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    const user = await getUserById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    logger.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### CSS/Styling

We use Tailwind CSS with the following conventions:

- Use semantic class names for complex components
- Group related classes together
- Use responsive design principles
- Maintain consistent spacing and typography

```typescript
// Good: Well-organized Tailwind classes
<div className="
  bg-white rounded-lg shadow-md 
  p-6 mb-4 
  hover:shadow-lg transition-shadow duration-200
  sm:p-4 md:p-6
">
  <h2 className="text-xl font-semibold text-gray-900 mb-2">
    Title
  </h2>
</div>
```

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

#### Frontend Tests

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from '../UserCard';

describe('UserCard', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  };

  it('renders user information', () => {
    render(<UserCard user={mockUser} onEdit={jest.fn()} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
    
    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });
});
```

#### Backend Tests

```typescript
// API test example
import request from 'supertest';
import app from '../server';

describe('Users API', () => {
  it('should create a new user', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(userData.name);
  });
});
```

### Test Coverage

Maintain test coverage above 80% for:
- Critical business logic
- API endpoints
- Component interactions
- Utility functions

## Pull Request Process

### Before Submitting

1. **Ensure all tests pass:**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

2. **Update documentation** if necessary

3. **Add or update tests** for new functionality

4. **Rebase your branch** on the latest main:
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

### Pull Request Template

Your PR should include:

- **Clear title and description**
- **Link to related issues**
- **Screenshots** for UI changes
- **Testing instructions**
- **Breaking changes** (if any)

### Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** by at least one maintainer
3. **Testing** by reviewer
4. **Approval** and merge

## Issue Reporting

### Bug Reports

Please include:

- **Clear title** and description
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Environment information** (OS, browser, Node.js version)
- **Screenshots** or logs if applicable

### Feature Requests

Please include:

- **Clear description** of the feature
- **Use case** and motivation
- **Proposed implementation** (if any)
- **Alternatives considered**

### Security Issues

**Do not** open public issues for security vulnerabilities. Instead:

1. Email security@coursepath-ai.com
2. Include a detailed description
3. Wait for acknowledgment before disclosure

## Architecture Guidelines

### Frontend Architecture

- **Components:** Reusable, single-responsibility
- **Hooks:** Custom hooks for shared logic
- **Context:** For global state (auth, theme)
- **Services:** API communication layer
- **Utils:** Pure utility functions

### Backend Architecture

- **Routes:** RESTful API design
- **Middleware:** Authentication, validation, error handling
- **Services:** Business logic layer
- **Models:** Data access layer
- **Utils:** Helper functions

### Database

- **Migrations:** Version-controlled schema changes
- **Indexes:** Proper indexing for performance
- **Constraints:** Data integrity enforcement
- **Normalization:** Follow 3NF principles

## Performance Guidelines

### Frontend Performance

- **Lazy loading** for route components
- **Memoization** for expensive calculations
- **Image optimization** and proper formats
- **Bundle size monitoring**

### Backend Performance

- **Database query optimization**
- **Caching** for frequently accessed data
- **Rate limiting** for API endpoints
- **Connection pooling**

## Security Guidelines

- **Input validation** on all user inputs
- **SQL injection prevention** with parameterized queries
- **XSS prevention** with proper escaping
- **CSRF protection** for state-changing operations
- **Secure headers** and HTTPS enforcement

## Documentation

- **Code comments** for complex logic
- **API documentation** for all endpoints
- **README updates** for setup changes
- **Architecture documentation** for major changes

## Questions?

- Create an issue for questions about the codebase
- Join our Discord server for real-time discussions
- Check existing documentation in the `/docs` folder

Thank you for contributing to CoursePathAI! 🚀
