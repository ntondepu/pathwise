#!/bin/bash

# Development setup script for CoursePathAI
# This script sets up the development environment and starts all services

set -e

echo "🚀 Setting up CoursePathAI development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if PostgreSQL is running
if ! pg_isready &> /dev/null; then
    echo "⚠️  PostgreSQL is not running. Please start PostgreSQL and try again."
    echo "You can start it with: brew services start postgresql (on macOS)"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build shared package
echo "🔨 Building shared package..."
cd shared && npm run build && cd ..

# Set up environment variables
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your API keys and database credentials"
fi

# Set up database
echo "🗄️  Setting up database..."
cd backend && npm run db:migrate && cd ..

# Create log directories
mkdir -p backend/logs

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your API keys"
echo "2. Start development servers with: npm run dev"
echo "3. Or start individual services:"
echo "   - Frontend: npm run dev:frontend"
echo "   - Backend: npm run dev:backend"
echo ""
echo "🌐 The app will be available at:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend: http://localhost:5000"
