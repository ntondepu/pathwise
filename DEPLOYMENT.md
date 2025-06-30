# Deployment Guide

This document outlines how to deploy CoursePathAI to production environments.

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Redis (for session storage)
- Domain name and SSL certificate
- API keys for external services

## Environment Setup

### Required Environment Variables

Create a `.env.production` file with the following variables:

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/coursepath_ai_prod
REDIS_URL=redis://localhost:6379

# Server
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com

# Firebase
FIREBASE_PROJECT_ID=your-firebase-project
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token

# External APIs
OPENAI_API_KEY=sk-your-openai-api-key
ADZUNA_APP_ID=your-adzuna-app-id
ADZUNA_API_KEY=your-adzuna-api-key

# Security
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret

# Monitoring
LOG_LEVEL=info
```

## Database Setup

1. Create production database:
```bash
createdb coursepath_ai_prod
```

2. Run migrations:
```bash
npm run db:migrate
```

3. Optionally seed with initial data (not recommended for production):
```bash
npm run db:seed
```

## Build Process

1. Install dependencies:
```bash
npm install --production
```

2. Build all packages:
```bash
npm run build
```

## Deployment Options

### Option 1: Traditional Server Deployment

1. **Prepare the server:**
   - Install Node.js 18+, PostgreSQL, Redis, Nginx
   - Create a non-root user for the application
   - Set up SSL certificates (Let's Encrypt recommended)

2. **Deploy the application:**
   ```bash
   # Clone the repository
   git clone https://github.com/your-org/coursepath-ai.git
   cd coursepath-ai
   
   # Install dependencies and build
   npm install --production
   npm run build
   
   # Set up environment
   cp .env.example .env.production
   # Edit .env.production with production values
   
   # Run database migrations
   npm run db:migrate
   
   # Create systemd service
   sudo cp scripts/coursepath-ai.service /etc/systemd/system/
   sudo systemctl enable coursepath-ai
   sudo systemctl start coursepath-ai
   ```

3. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$server_name$request_uri;
   }
   
   server {
       listen 443 ssl;
       server_name your-domain.com;
       
       ssl_certificate /path/to/your/cert.pem;
       ssl_certificate_key /path/to/your/key.pem;
       
       # Frontend
       location / {
           root /path/to/coursepath-ai/frontend/build;
           try_files $uri $uri/ /index.html;
       }
       
       # API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 2: Docker Deployment

1. **Build Docker images:**
   ```bash
   docker-compose -f docker-compose.prod.yml build
   ```

2. **Run with Docker Compose:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Option 3: Cloud Deployment (Vercel + Railway)

1. **Frontend (Vercel):**
   - Connect your GitHub repository to Vercel
   - Set build command: `npm run build --workspace=frontend`
   - Set build directory: `frontend/build`
   - Add environment variables in Vercel dashboard

2. **Backend (Railway/Render/Heroku):**
   - Connect repository to Railway
   - Set build command: `npm run build --workspace=backend`
   - Set start command: `npm run start --workspace=backend`
   - Add environment variables in Railway dashboard
   - Add PostgreSQL addon

## Performance Optimization

### Backend Optimizations

1. **Enable gzip compression** (already configured)
2. **Set up Redis for session storage:**
   ```bash
   npm install connect-redis express-session
   ```

3. **Enable database connection pooling** (already configured)

4. **Set up CDN for static assets**

### Frontend Optimizations

1. **Enable service worker for caching**
2. **Optimize bundle size:**
   ```bash
   npm run analyze # If bundle analyzer is configured
   ```

3. **Enable gzip/brotli compression on web server**

## Monitoring and Logging

### Application Monitoring

1. **Set up Winston for structured logging** (already configured)

2. **Add error tracking (Sentry):**
   ```bash
   npm install @sentry/node @sentry/react
   ```

3. **Set up health checks:**
   - Database connectivity
   - External API availability
   - Memory usage
   - Response times

### Infrastructure Monitoring

1. **Server metrics:**
   - CPU usage
   - Memory usage
   - Disk space
   - Network traffic

2. **Database monitoring:**
   - Connection pool status
   - Query performance
   - Database size

3. **External API monitoring:**
   - Response times
   - Error rates
   - Rate limiting status

## Security Considerations

### Application Security

1. **Environment variables:** Never commit secrets to version control
2. **HTTPS:** Always use SSL in production
3. **CORS:** Configure appropriate CORS settings
4. **Rate limiting:** Already configured for API endpoints
5. **Input validation:** Use Zod schemas for validation
6. **SQL injection:** Use parameterized queries (already implemented)

### Infrastructure Security

1. **Firewall:** Configure UFW or iptables
2. **SSH:** Use key-based authentication only
3. **Database:** Restrict database access to application only
4. **Updates:** Keep system packages updated

## Backup and Recovery

### Database Backups

1. **Automated daily backups:**
   ```bash
   #!/bin/bash
   # Add to crontab: 0 2 * * * /path/to/backup-script.sh
   
   BACKUP_DIR="/var/backups/coursepath-ai"
   DATE=$(date +%Y%m%d_%H%M%S)
   
   pg_dump coursepath_ai_prod | gzip > "$BACKUP_DIR/db_backup_$DATE.sql.gz"
   
   # Keep only last 30 days
   find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +30 -delete
   ```

2. **Test backup restoration regularly**

### Application Backups

1. **Code:** Stored in version control
2. **Environment configuration:** Backup .env files securely
3. **User uploads:** If applicable, backup file storage

## Scaling Considerations

### Horizontal Scaling

1. **Load balancer:** Use Nginx or cloud load balancer
2. **Multiple backend instances:** Configure session store (Redis)
3. **Database read replicas:** For read-heavy workloads

### Vertical Scaling

1. **Monitor resource usage**
2. **Optimize database queries**
3. **Implement caching strategies**

## Troubleshooting

### Common Issues

1. **Database connection errors:**
   - Check connection string
   - Verify PostgreSQL is running
   - Check firewall settings

2. **Build failures:**
   - Verify Node.js version
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

3. **API rate limits:**
   - Check external API quotas
   - Implement request caching
   - Use API key rotation

### Log Analysis

```bash
# View application logs
sudo journalctl -u coursepath-ai -f

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# View PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

## Maintenance

### Regular Tasks

1. **Security updates:** Monthly system updates
2. **Dependency updates:** Review and update npm packages
3. **Database maintenance:** VACUUM and ANALYZE tables
4. **Log rotation:** Configure logrotate for application logs
5. **SSL certificate renewal:** Automated with Let's Encrypt

### Performance Monitoring

1. **Database query analysis:**
   ```sql
   SELECT query, mean_time, calls 
   FROM pg_stat_statements 
   ORDER BY mean_time DESC 
   LIMIT 10;
   ```

2. **API endpoint performance monitoring**
3. **Error rate tracking**
4. **User experience metrics**
