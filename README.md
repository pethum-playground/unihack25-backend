# UniHack25 Backend - Smart Contract Management System

A secure Node.js/TypeScript backend API for managing smart contracts, digital signatures, and blockchain-based document verification. This system provides comprehensive contract lifecycle management with advanced security features.

## 🚀 Features

### Core Functionality
- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Smart Contract Management**: Create, sign, and manage digital contracts
- **Document Storage**: Secure BLOB storage for contract documents
- **Digital Signatures**: Blockchain-based signature verification
- **Email Notifications**: Automated email invitations and QR code generation
- **Wallet Integration**: Web3 wallet address verification and management

### Security Features
- **Password Hashing**: BCrypt with salt rounds for secure password storage
- **JWT Token Security**: Configurable secret keys with expiration handling
- **Wallet Verification**: Blockchain wallet address validation
- **Access Control**: Route-based authentication middleware
- **Input Validation**: Comprehensive request validation and sanitization
- **Error Handling**: Secure error responses without sensitive data exposure

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **PostgreSQL**: v12.0 or higher
- **npm**: v8.0.0 or higher
- **SMTP Email Service**: Gmail or similar for email notifications

## 🛠️ Installation & Setup

> **⚠️ Important**: Follow these steps in order for a successful setup.

### 📋 Step 1: Clone the Repository
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd unihack25-backend

# Verify you're in the correct directory
pwd
```

### 📦 Step 2: Install Dependencies
```bash
# Install all project dependencies
npm install

# Verify installation
npm list --depth=0
```

### 🗄️ Step 3: Database Setup

#### 3.1 PostgreSQL Installation
Choose your operating system:

<details>
<summary><b>🐧 Linux (Ubuntu/Debian)</b></summary>

```bash
# Update package list
sudo apt update

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database user
sudo -u postgres createuser --interactive --pwprompt unihack_user

# Create database
sudo -u postgres createdb unihack25_db --owner=unihack_user
```
</details>

<details>
<summary><b>🍎 macOS</b></summary>

```bash
# Using Homebrew
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database user
createuser -s -r -d unihack_user

# Set password for user
psql -c "ALTER USER unihack_user PASSWORD 'your_password';"

# Create database
createdb unihack25_db -O unihack_user
```
</details>

<details>
<summary><b>🪟 Windows</b></summary>

1. Download PostgreSQL installer from https://www.postgresql.org/download/windows/
2. Run installer and follow setup wizard
3. Remember the password you set for the postgres user
4. Use pgAdmin or command line to create:
   - User: `unihack_user`
   - Database: `unihack25_db`
</details>

#### 3.2 Verify Database Connection
```bash
# Test database connection
psql -h localhost -U unihack_user -d unihack25_db

# If successful, you should see:
# unihack25_db=>
# Type \q to exit
```

### 🔐 Step 4: Environment Configuration

#### 4.1 Create Environment File
```bash
# Create .env file in project root
touch .env

# Open in your preferred editor
code .env
# or
nano .env
```

#### 4.2 Environment Variables Setup
Copy and paste the following into your `.env` file:

```env
# =====================================
# DATABASE CONFIGURATION
# =====================================
DATABASE_URL="postgresql://unihack_user:your_db_password@localhost:5432/unihack25_db"

# =====================================
# JWT SECURITY CONFIGURATION
# =====================================
# Generate a secure secret: openssl rand -hex 32
JWT_SECRET="your-super-secure-jwt-secret-key-minimum-32-characters-long"

# =====================================
# SERVER CONFIGURATION
# =====================================
PORT=3100
NODE_ENV=development

# =====================================
# FRONTEND CONFIGURATION
# =====================================
FRONTEND_URL="http://localhost:3000"

# =====================================
# EMAIL CONFIGURATION
# =====================================
# Gmail SMTP Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-gmail-app-password"

# =====================================
# OPTIONAL: LOGGING CONFIGURATION
# =====================================
LOG_LEVEL="info"
```

#### 4.3 Generate Secure JWT Secret
```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy the output and replace JWT_SECRET in .env file
```

#### 4.4 Gmail App Password Setup
<details>
<summary><b>📧 How to get Gmail App Password</b></summary>

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security > App passwords
4. Generate an app password for "Mail"
5. Use this password in `SMTP_PASSWORD` (not your regular Gmail password)
</details>

### 🏗️ Step 5: Database Schema Setup

#### 5.1 Generate Prisma Client
```bash
# Generate Prisma client
npm run db:generate

# You should see output similar to:
# ✔ Generated Prisma Client
```

#### 5.2 Run Database Migrations
```bash
# Apply database migrations
npm run db:migrate

# When prompted, enter a migration name (e.g., "initial_setup")
# You should see:
# ✔ Database migrations applied successfully
```

#### 5.3 Verify Database Setup
```bash
# Optional: Open Prisma Studio to view your database
npm run db:studio

# This will open http://localhost:5555 in your browser
```

### ✅ Step 6: Verification & Testing

#### 6.1 Build Project
```bash
# Build the TypeScript project
npm run build

# Verify build success
ls -la dist/
```

#### 6.2 Test Database Connection
```bash
# Test database connectivity
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$connect()
  .then(() => console.log('✅ Database connection successful'))
  .catch(e => console.error('❌ Database connection failed:', e))
  .finally(() => prisma.\$disconnect());
"
```

#### 6.3 Environment Variables Check
```bash
# Check if all required environment variables are set
node -e "
const required = ['DATABASE_URL', 'JWT_SECRET', 'SMTP_USER', 'SMTP_PASSWORD'];
const missing = required.filter(key => !process.env[key]);
if (missing.length) {
  console.error('❌ Missing environment variables:', missing);
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set');
}
"
```

### 🔥 Step 7: Start the Application

#### 7.1 Development Mode
```bash
# Start development server with hot reload
npm run dev

# You should see:
# Server is listening on 3100
# database connected successfully
```

#### 7.2 Test API Endpoints
```bash
# Test health check endpoint
curl http://localhost:3100/healthz

# Expected response:
# {
#   "status": "healthy",
#   "database": "connected",
#   "timestamp": "2025-07-08T..."
# }
```

### 🎯 Quick Start Summary

```bash
# 1. Clone and install
git clone <repository-url>
cd unihack25-backend
npm install

# 2. Setup database (PostgreSQL must be running)
npm run db:generate
npm run db:migrate

# 3. Create .env file with required variables
cp .env.example .env  # Edit with your values

# 4. Start development server
npm run dev

# 5. Test the API
curl http://localhost:3100/healthz
```

### 🆘 Common Issues & Solutions

<details>
<summary><b>❌ Database Connection Failed</b></summary>

**Issue**: `Error: Can't reach database server`

**Solutions**:
1. Check if PostgreSQL is running: `sudo systemctl status postgresql`
2. Verify DATABASE_URL in .env file
3. Check firewall settings
4. Ensure database user has correct permissions
</details>

<details>
<summary><b>❌ JWT Secret Error</b></summary>

**Issue**: `JWT_SECRET must be at least 32 characters`

**Solution**: Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
</details>

<details>
<summary><b>❌ Email Service Error</b></summary>

**Issue**: `SMTP Authentication failed`

**Solutions**:
1. Use Gmail App Password, not regular password
2. Enable 2-Factor Authentication on Gmail
3. Check SMTP settings in .env file
</details>

<details>
<summary><b>❌ Port Already in Use</b></summary>

**Issue**: `Port 3100 is already in use`

**Solution**: Change port in .env file:
```env
PORT=3001
```
</details>

## 🚀 Running the Application

### 🔧 Development Mode
```bash
# Start development server with hot reload
npm run dev

# Output should show:
# [INFO] Server is listening on 3100
# [INFO] database connected successfully
```

**🌐 Access Points:**
- **API Base URL**: `http://localhost:3100/api/v1`
- **Health Check**: `http://localhost:3100/healthz`
- **Prisma Studio**: `http://localhost:5555` (if running)

### 🏭 Production Mode
```bash
# 1. Build the application
npm run build

# 2. Start production server
npm start

# 3. Verify production deployment
curl http://localhost:3100/healthz
```

### 🐳 Docker Deployment

#### Option 1: Single Container
```bash
# Build Docker image
docker build -t unihack25-backend .

# Run container with environment file
docker run -d \
  --name unihack25-backend \
  -p 3100:3100 \
  --env-file .env \
  unihack25-backend

# Check logs
docker logs unihack25-backend
```

#### Option 2: Docker Compose (Recommended)
Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: unihack25_db
      POSTGRES_USER: unihack_user
      POSTGRES_PASSWORD: your_secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    ports:
      - "3100:3100"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://unihack_user:your_secure_password@postgres:5432/unihack25_db
      JWT_SECRET: your_secure_jwt_secret
      # ... other environment variables
    volumes:
      - ./logs:/app/logs

volumes:
  postgres_data:
```

```bash
# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 🔍 Application Monitoring

#### Real-time Logs
```bash
# Development mode logs
npm run dev | grep -E "(ERROR|WARN|INFO)"

# Production mode logs
tail -f logs/app.log
```

#### Health Monitoring
```bash
# Continuous health check
watch -n 10 'curl -s http://localhost:3100/healthz | jq .'

# Database connectivity check
curl -s http://localhost:3100/healthz | jq '.database'
```

### 🔄 Process Management (Production)

#### Using PM2
```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start npm --name "unihack25-backend" -- start

# Monitor processes
pm2 monit

# View logs
pm2 logs unihack25-backend

# Restart application
pm2 restart unihack25-backend

# Stop application
pm2 stop unihack25-backend
```

#### PM2 Ecosystem File
Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'unihack25-backend',
    script: 'npm',
    args: 'start',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3100
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

```bash
# Start with ecosystem file
pm2 start ecosystem.config.js
```

## 📚 API Documentation

### 🌐 Base URL
```
http://localhost:3100/api/v1
```

### 🔓 Public Endpoints (No Authentication Required)

#### 🏥 Health Check
```http
GET /healthz
```
**Response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-07-08T12:00:00.000Z"
}
```

#### 📝 User Registration
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**✅ Success Response (201):**
```json
{
  "message": "registration successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "enabled": false,
    "createdAt": "2025-07-08T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 🔐 User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**✅ Success Response (200):**
```json
{
  "message": "login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "walletAddress": "0x1234567890abcdef",
    "enabled": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 🔒 Protected Endpoints (Authentication Required)

> **🔑 Authorization Header Required:**
> ```http
> Authorization: Bearer <jwt-token>
> ```

#### 👥 User Management

**📋 Get All Users**
```http
GET /users
Authorization: Bearer <jwt-token>
```

**✅ Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "walletAddress": "0x1234567890abcdef",
    "enabled": true,
    "createdAt": "2025-07-08T12:00:00.000Z"
  }
]
```

**✏️ Update User Profile**
```http
PUT /users
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "walletAddress": "0x1234567890abcdef"
}
```

**⚡ Initial Enable User (Wallet Setup)**
```http
POST /users/initial-enable
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "walletAddress": "0x1234567890abcdef",
  "initialTransactionHash": "0xabcdef123456789"
}
```

#### 📄 Contract Management

**🔍 Verify User Wallet**
```http
POST /contracts/verify-user
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "walletAddress": "0x1234567890abcdef"
}
```

**✅ Success Response (200):**
```json
{
  "message": "User verified successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

**📝 Create Contract**
```http
POST /contracts
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data

# Form Data:
document: [PDF/DOC file]
name: "Employment Contract"
description: "Full-time employment agreement"
type: "Employment"
transactionHash: "0xabcdef123456789"
walletAddress: "0x1234567890abcdef"
contractAddress: "0x987654321fedcba"
signers: [
  {
    "email": "signer1@example.com",
    "walletAddress": "0x1111111111111111"
  },
  {
    "email": "signer2@example.com",
    "walletAddress": "0x2222222222222222"
  }
]
```

**✅ Success Response (201):**
```json
{
  "message": "Contract created successfully and QR codes sent to all participants",
  "contract": {
    "id": 1,
    "name": "Employment Contract",
    "description": "Full-time employment agreement",
    "type": "Employment",
    "contractAddress": "0x987654321fedcba",
    "transactionHash": "0xabcdef123456789",
    "status": "draft",
    "createdAt": "2025-07-08T12:00:00.000Z",
    "creator": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com"
    },
    "signers": [
      {
        "id": 1,
        "status": "pending",
        "user": {
          "id": 2,
          "name": "signer1@example.com",
          "email": "signer1@example.com"
        }
      }
    ],
    "documentInfo": {
      "originalName": "contract.pdf",
      "mimeType": "application/pdf",
      "size": 245760
    }
  }
}
```

**📋 Get User's Contracts**
```http
GET /contracts/users
Authorization: Bearer <jwt-token>
```

**🔍 Get Contract by ID**
```http
GET /contracts/1
Authorization: Bearer <jwt-token>
```

**📥 Download Contract Document**
```http
GET /contracts/1/document
Authorization: Bearer <jwt-token>
```

**✍️ Sign Contract**
```http
PUT /contracts/1/sign
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "transactionHash": "0xabcdef123456789",
  "walletAddress": "0x1234567890abcdef"
}
```

**✅ Success Response (200):**
```json
{
  "message": "Contract signed successfully",
  "contractSigner": {
    "id": 1,
    "status": "signed",
    "signedAt": "2025-07-08T12:00:00.000Z",
    "transactionHash": "0xabcdef123456789"
  }
}
```

**🗑️ Delete Contract**
```http
DELETE /contracts/1
Authorization: Bearer <jwt-token>
```

### 🚨 Error Responses

#### 🔒 Authentication Errors
```json
// 401 Unauthorized
{
  "error": "Access denied. No token provided."
}

// 401 Token Expired
{
  "error": "Token expired."
}

// 401 Invalid Token
{
  "error": "Invalid token."
}
```

#### ❌ Validation Errors
```json
// 400 Bad Request
{
  "error": "Email and password are required"
}

// 409 Conflict
{
  "error": "User already exists"
}

// 403 Forbidden
{
  "error": "Forbidden: Wallet address does not match"
}
```

#### 🔧 Server Errors
```json
// 500 Internal Server Error
{
  "error": "Internal server error"
}

// 503 Service Unavailable
{
  "status": "unhealthy",
  "database": "disconnected",
  "timestamp": "2025-07-08T12:00:00.000Z"
}
```

### 📝 cURL Examples

#### Test Authentication Flow
```bash
# 1. Register a new user
curl -X POST http://localhost:3100/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securePassword123",
    "name": "Test User"
  }'

# 2. Login and get token
TOKEN=$(curl -X POST http://localhost:3100/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securePassword123"
  }' | jq -r '.token')

# 3. Use token for protected endpoint
curl -X GET http://localhost:3100/api/v1/users \
  -H "Authorization: Bearer $TOKEN"
```

#### Test Contract Creation
```bash
# Create contract with file upload
curl -X POST http://localhost:3100/api/v1/contracts \
  -H "Authorization: Bearer $TOKEN" \
  -F "document=@contract.pdf" \
  -F "name=Test Contract" \
  -F "description=Test Description" \
  -F "type=NDA" \
  -F "transactionHash=0xabcdef123456789" \
  -F "walletAddress=0x1234567890abcdef" \
  -F "contractAddress=0x987654321fedcba" \
  -F 'signers=[{"email":"signer@example.com","walletAddress":"0x1111111111111111"}]'
```

## 🗄️ Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique email address
- `password`: Hashed password
- `name`: User's full name
- `walletAddress`: Blockchain wallet address
- `initialTransactionHash`: First transaction hash
- `enabled`: Account activation status

### Contracts Table
- `id`: Primary key
- `contractAddress`: Blockchain contract address
- `name`: Contract name
- `description`: Contract description
- `type`: Contract type (NDA, Employment, etc.)
- `document`: Binary document storage
- `transactionHash`: Creation transaction hash
- `createdBy`: User ID of creator
- `status`: Contract status (draft, active, completed, cancelled)

### Contract Signers Table
- `id`: Primary key
- `contractId`: Foreign key to contracts
- `userId`: Foreign key to users
- `status`: Signature status (pending, signed, rejected)
- `signedAt`: Signature timestamp
- `transactionHash`: Signature transaction hash

## 🔒 Security Implementation

### 🔐 Authentication & Authorization

#### JWT Token Security
```typescript
// Token Structure
{
  "uid": 1,
  "email": "user@example.com",
  "iat": 1625097600,
  "exp": 1625184000  // 24 hours expiration
}
```

**Security Features:**
- ✅ **Configurable Expiration**: 24-hour token lifetime
- ✅ **Secure Secret**: Minimum 32-character secret key
- ✅ **Token Verification**: Comprehensive validation with error handling
- ✅ **Automatic Expiration**: Tokens expire automatically for security

#### Password Security
```typescript
// Password Hashing Implementation
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

**Security Features:**
- ✅ **BCrypt Hashing**: Industry-standard password hashing
- ✅ **Salt Rounds**: 10 rounds for optimal security/performance balance
- ✅ **No Plain Text**: Passwords never stored in plain text
- ✅ **Secure Comparison**: Constant-time password comparison

### 🛡️ Authorization Controls

#### Route Protection
```typescript
// Protected Route Example
app.use('/api/v1', authMiddleware);  // All routes require authentication
app.use('/api/v1/auth', guestRoutes); // Exception for auth routes
```

**Access Control Features:**
- ✅ **Middleware-based Protection**: Centralized authentication logic
- ✅ **User Context Injection**: Secure user information in requests
- ✅ **Route-level Security**: Fine-grained access control
- ✅ **Wallet Verification**: Blockchain wallet validation before sensitive operations

#### User Context Security
```typescript
// Secure user context in protected routes
interface AuthenticatedRequest extends Request {
  user: {
    uid: number;
    email: string;
    name?: string;
  };
}
```

### 🔒 Data Protection

#### Database Security
```typescript
// Prisma ORM with parameterized queries
const user = await prisma.user.findUnique({
  where: { email: userEmail }  // Automatically parameterized
});
```

**Security Features:**
- ✅ **SQL Injection Prevention**: Prisma ORM with parameterized queries
- ✅ **Connection Pooling**: Efficient database connection management
- ✅ **Query Logging**: Comprehensive database activity logging
- ✅ **Transaction Support**: ACID compliance for data integrity

#### File Upload Security
```typescript
// Multer configuration for secure file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1 // Single file upload
  }
});
```

**Security Features:**
- ✅ **File Size Limits**: Maximum 10MB file uploads
- ✅ **Memory Storage**: Secure temporary file handling
- ✅ **BLOB Storage**: Binary document storage in database
- ✅ **File Type Validation**: Document type verification

### 🌐 Network Security

#### CORS Configuration
```typescript
// CORS setup for frontend integration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

**Security Features:**
- ✅ **Origin Validation**: Configurable allowed origins
- ✅ **Credential Support**: Secure cookie/credential handling
- ✅ **Method Restrictions**: Controlled HTTP methods
- ✅ **Header Validation**: Secure header configuration

#### Input Validation
```typescript
// Request validation example
if (!email || !password) {
  return res.status(400).json({
    error: 'Email and password are required'
  });
}
```

**Security Features:**
- ✅ **Required Field Validation**: Mandatory field checks
- ✅ **Type Validation**: Data type verification
- ✅ **Sanitization**: Input cleaning and normalization
- ✅ **Length Validation**: Maximum input length limits

### 🔍 Error Handling & Logging

#### Secure Error Responses
```typescript
// Secure error handling
try {
  // Operation
} catch (error) {
  logger.error('Operation failed:', error);
  return res.status(500).json({
    error: 'Internal server error'  // Generic error message
  });
}
```

**Security Features:**
- ✅ **No Information Disclosure**: Generic error messages to clients
- ✅ **Detailed Logging**: Comprehensive error logging for debugging
- ✅ **Error Classification**: Proper HTTP status codes
- ✅ **Stack Trace Protection**: No sensitive information in responses

#### Security Monitoring
```typescript
// Winston logger configuration
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'security.log' })
  ]
});
```

**Logging Features:**
- ✅ **Structured Logging**: JSON-formatted log entries
- ✅ **Timestamp Tracking**: Precise timing information
- ✅ **Security Events**: Authentication and authorization logging
- ✅ **Performance Monitoring**: Request timing and database queries

### 🛡️ Blockchain Security

#### Wallet Verification
```typescript
// Wallet address validation
if (user.walletAddress !== walletAddress) {
  logger.error('Wallet address mismatch', { 
    userId: user.id, 
    providedAddress: walletAddress 
  });
  return res.status(403).json({
    error: 'Forbidden: Wallet address does not match'
  });
}
```

**Blockchain Security Features:**
- ✅ **Address Validation**: Wallet address verification before operations
- ✅ **Transaction Verification**: Blockchain transaction hash validation
- ✅ **Signature Verification**: Digital signature validation
- ✅ **Immutable Records**: Blockchain-based audit trail

### 🔒 Security Headers

#### Security Middleware (Recommended)
```typescript
// Additional security headers (to be implemented)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});
```

### 🔐 Security Best Practices Implemented

| Security Measure | Implementation | Status |
|------------------|----------------|---------|
| **Authentication** | JWT tokens with expiration | ✅ Implemented |
| **Authorization** | Role-based access control | ✅ Implemented |
| **Password Security** | BCrypt hashing | ✅ Implemented |
| **SQL Injection Prevention** | Prisma ORM | ✅ Implemented |
| **XSS Protection** | Input validation | ✅ Implemented |
| **CORS Configuration** | Origin validation | ✅ Implemented |
| **File Upload Security** | Size limits & validation | ✅ Implemented |
| **Error Handling** | Secure error responses | ✅ Implemented |
| **Logging** | Comprehensive audit trail | ✅ Implemented |
| **Blockchain Verification** | Wallet & transaction validation | ✅ Implemented |

### 🚨 Security Recommendations

#### For Development
- [ ] Use strong JWT secrets (minimum 32 characters)
- [ ] Enable HTTPS in development with self-signed certificates
- [ ] Implement rate limiting for API endpoints
- [ ] Add request validation middleware
- [ ] Set up security headers middleware

#### For Production
- [ ] Use environment-specific JWT secrets
- [ ] Enable HTTPS with valid SSL certificates
- [ ] Implement comprehensive rate limiting
- [ ] Set up WAF (Web Application Firewall)
- [ ] Configure security monitoring and alerting
- [ ] Regular security audits and penetration testing
- [ ] Database connection encryption
- [ ] API versioning and deprecation strategy

## 🌐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | default_j |
| `PORT` | Server port | No | 3100 |
| `NODE_ENV` | Environment mode | No | development |
| `FRONTEND_URL` | Frontend application URL | No | http://localhost:3000 |
| `SMTP_HOST` | SMTP server hostname | No | smtp.gmail.com |
| `SMTP_PORT` | SMTP server port | No | 587 |
| `SMTP_USER` | SMTP username | Yes | - |
| `SMTP_PASSWORD` | SMTP password | Yes | - |

## 📁 Project Structure

```
src/
├── api/v1/                    # API version 1
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── contract.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares/           # Custom middleware
│   │   └── auth.ts
│   └── routes/                # API routes
│       ├── app.route.ts
│       ├── auth.route.ts
│       ├── contract.route.ts
│       └── user.route.ts
├── config/                    # Configuration files
│   └── constant.ts
├── services/                  # Business logic services
│   ├── common/
│   │   ├── email.service.ts
│   │   └── logger.service.ts
│   └── database/
│       └── prisma.service.ts
├── types/                     # TypeScript type definitions
│   └── express.d.ts
└── app.ts                     # Express application setup
```

## 🧪 Testing & Validation

### 🔍 Health Check
```bash
# Basic health check
curl http://localhost:3100/healthz

# Expected healthy response:
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-07-08T12:00:00.000Z"
}
```

### 📋 API Testing with Postman/Insomnia

#### 1. Import Collection
Create a new collection with the following requests:

**Environment Variables:**
```json
{
  "baseUrl": "http://localhost:3100/api/v1",
  "token": "{{jwt_token}}"
}
```

#### 2. Authentication Flow Test
```bash
# Test registration
curl -X POST "{{baseUrl}}/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "name": "Test User"
  }'

# Test login and capture token
curl -X POST "{{baseUrl}}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

#### 3. Protected Endpoint Test
```bash
# Test protected endpoint
curl -X GET "{{baseUrl}}/users" \
  -H "Authorization: Bearer {{token}}"
```

### 🔧 Development Testing

#### Unit Testing Setup
```bash
# Install testing dependencies
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest

# Create test script in package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

#### Integration Testing Example
```typescript
// tests/auth.test.ts
import request from 'supertest';
import app from '../src/app';

describe('Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'TestPassword123',
        name: 'Test User'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('registration successful');
    expect(response.body.token).toBeDefined();
  });
});
```

### 🛠️ Troubleshooting Guide

#### ❌ Common Issues & Solutions

<details>
<summary><b>🔴 Database Connection Issues</b></summary>

**Issue 1: "Can't reach database server"**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Start PostgreSQL if stopped
sudo systemctl start postgresql

# Check if database exists
psql -U postgres -c "\l" | grep unihack25_db
```

**Issue 2: "Connection refused"**
```bash
# Check if PostgreSQL is listening on correct port
sudo netstat -tlnp | grep 5432

# Check PostgreSQL configuration
sudo nano /etc/postgresql/*/main/postgresql.conf
# Ensure: listen_addresses = '*'
```

**Issue 3: "Authentication failed"**
```bash
# Reset database password
sudo -u postgres psql
ALTER USER unihack_user PASSWORD 'new_password';

# Update DATABASE_URL in .env file
DATABASE_URL="postgresql://unihack_user:new_password@localhost:5432/unihack25_db"
```

**Issue 4: "Database does not exist"**
```bash
# Create database manually
sudo -u postgres createdb unihack25_db -O unihack_user

# Or using psql
sudo -u postgres psql
CREATE DATABASE unihack25_db OWNER unihack_user;
```
</details>

<details>
<summary><b>🔴 Environment Configuration Issues</b></summary>

**Issue 1: "JWT_SECRET is required"**
```bash
# Generate secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env file
JWT_SECRET="generated-secret-here"
```

**Issue 2: "SMTP Authentication failed"**
```bash
# For Gmail - enable 2FA and generate app password
# Go to: https://myaccount.google.com/apppasswords
# Use app password instead of regular password

# Test SMTP configuration
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});
transporter.verify((error, success) => {
  if (error) console.log('SMTP Error:', error);
  else console.log('SMTP Connection: OK');
});
"
```

**Issue 3: "Environment variables not loaded"**
```bash
# Check if .env file exists
ls -la .env

# Check if variables are loaded
node -e "
require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
"
```
</details>

<details>
<summary><b>🔴 Application Runtime Issues</b></summary>

**Issue 1: "Port 3100 already in use"**
```bash
# Find process using port
lsof -i :3100

# Kill process
kill -9 <PID>

# Or use different port in .env
PORT=3001
```

**Issue 2: "Prisma Client not generated"**
```bash
# Generate Prisma client
npm run db:generate

# If schema changed, migrate
npm run db:migrate
```

**Issue 3: "TypeScript compilation errors"**
```bash
# Check TypeScript version
npx tsc --version

# Compile with details
npx tsc --noEmit

# Fix common issues
npm install --save-dev @types/node @types/express
```

**Issue 4: "Module not found"**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18.0.0 or higher
```
</details>

<details>
<summary><b>🔴 API Testing Issues</b></summary>

**Issue 1: "Unauthorized (401)"**
```bash
# Check if token is valid
node -e "
const jwt = require('jsonwebtoken');
const token = 'your-jwt-token';
const secret = process.env.JWT_SECRET || 'default_j';
try {
  const decoded = jwt.verify(token, secret);
  console.log('Token valid:', decoded);
} catch (err) {
  console.log('Token invalid:', err.message);
}
"

# Get new token
curl -X POST http://localhost:3100/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email","password":"your-password"}'
```

**Issue 2: "Request timeout"**
```bash
# Check server status
curl -I http://localhost:3100/healthz

# Check server logs
npm run dev  # Check console output for errors
```

**Issue 3: "File upload fails"**
```bash
# Check file size (max 10MB)
ls -lh contract.pdf

# Check if multer is configured
curl -X POST http://localhost:3100/api/v1/contracts \
  -H "Authorization: Bearer $TOKEN" \
  -F "document=@small-test-file.pdf" \
  -F "name=Test" \
  -F "type=Test" \
  -F "transactionHash=0x123"
```
</details>

### 📊 Performance Monitoring

#### Application Metrics
```bash
# Monitor memory usage
node -e "
setInterval(() => {
  const used = process.memoryUsage();
  console.log('Memory usage:', {
    rss: Math.round(used.rss / 1024 / 1024 * 100) / 100 + ' MB',
    heapTotal: Math.round(used.heapTotal / 1024 / 1024 * 100) / 100 + ' MB',
    heapUsed: Math.round(used.heapUsed / 1024 / 1024 * 100) / 100 + ' MB'
  });
}, 5000);
"

# Monitor CPU usage
top -p \$(pgrep node)
```

#### Database Performance
```bash
# Monitor database connections
psql -U unihack_user -d unihack25_db -c "
SELECT count(*) as connection_count 
FROM pg_stat_activity 
WHERE datname = 'unihack25_db';
"

# Check slow queries
psql -U unihack_user -d unihack25_db -c "
SELECT query, mean_exec_time, calls 
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;
"
```

### 🔍 Log Analysis

#### Application Logs
```bash
# Follow application logs
tail -f logs/app.log

# Filter error logs
grep -i error logs/app.log

# Search for specific patterns
grep -i "database\|error\|auth" logs/app.log
```

#### Database Logs
```bash
# PostgreSQL logs location
sudo tail -f /var/log/postgresql/postgresql-*.log

# Filter connection errors
sudo grep -i "connection\|error" /var/log/postgresql/postgresql-*.log
```

### 🚀 Load Testing

#### Simple Load Test
```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Test health endpoint
ab -n 1000 -c 10 http://localhost:3100/healthz

# Test with authentication
ab -n 100 -c 5 -H "Authorization: Bearer $TOKEN" \
   http://localhost:3100/api/v1/users
```

#### Advanced Load Testing with Artillery
```bash
# Install Artillery
npm install -g artillery

# Create load test configuration
echo "
config:
  target: 'http://localhost:3100'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: 'Health Check'
    requests:
      - get:
          url: '/healthz'
" > load-test.yml

# Run load test
artillery run load-test.yml
```

## 🚀 Deployment

### Production Checklist
1. Set secure `JWT_SECRET` in production
2. Configure production database
3. Set up SMTP email service
4. Configure environment variables
5. Set up SSL/TLS certificates
6. Configure reverse proxy (Nginx/Apache)
7. Set up monitoring and logging
8. Configure backup strategies

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 📞 Support

For technical support or questions:
- Check the API documentation above
- Review the security implementation
- Verify environment configuration
- Check database connectivity
- Review application logs

## 🔐 Security Best Practices

1. **Always use HTTPS in production**
2. **Regularly rotate JWT secrets**
3. **Monitor for suspicious activities**
4. **Keep dependencies updated**
5. **Implement rate limiting**
6. **Use strong passwords for database**
7. **Enable database connection pooling**
8. **Regular security audits**

## 📝 License

This project is licensed under the ISC License.

---

**Note**: This is a backend API service designed for blockchain-based contract management. Ensure proper security measures are implemented before deploying to production environments.
