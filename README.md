# Package Management System

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Setup Instructions](#setup-instructions)
5. [Authentication Workflow](#authentication-workflow)
6. [Package Operations](#package-operations)
7. [Error Handling](#error-handling)
8. [Advanced Querying](#advanced-querying)
9. [Troubleshooting](#troubleshooting)

## Project Overview

A basic Package Management System built with Node.js, Payload CMS v3 with GraphQL support, and MongoDB. The system provides comprehensive package management with role-based authentication and advanced filtering capabilities.

## Tech Stack
- Node.js
- Payload CMS v3
- GraphQL
- MongoDB
- JWT Authentication

## Prerequisites
- Node.js (v18+)
- MongoDB (v5+)
- pnpm (preferred) or npm

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/El-Nazy/package-management-system
cd package-management-system
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install --legacy-peer-deps
```

### 3. Environment Configuration
Copy the contents of .env.example over a `.env` file in the project root and modify as desired.
```
# Payload CMS Configuration
DATABASE_URI=mongodb://127.0.0.1/package-management-system
PAYLOAD_SECRET=YOUR_SECRET_HERE

# Admin User Setup (Optional)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_admin_password
```

### 4. Start the Development Server
```bash
pnpm dev
# or
npm run dev
```

## Authentication Workflow

### 1. User Registration
```graphql
# Write your query or mutation here
mutation {
  createUser(
    data: {
      email: "user@exasmpl.com"
      password: "securePassword123"
      role: user # or admin (NB: only admin can set role)
    }
  ) {
    id
    email
    role
  }
}
```

### 2. User Login
```graphql
mutation {
  loginUser(
    email: "user@example.com"
    password: "securePassword123"
  ) {
    user {
      id
      email
      role
    }
    token
    exp
  }
}
```

### 3. Token Usage
Include the token in your GraphQL request headers:
```
Authorization: Bearer <your_jwt_token>
```

## Package Operations

### Create a Package (Admin Only)
```graphql
mutation {
  createPackage(
    data: {
      name: "Premium Package"
      description: "Comprehensive service package"
      price: 299.99
      expirationDate: "2024-12-04T10:10:35.906Z" # Date should be in ISO format
    }
  ) {
    id
    name
    price
    expirationDate
  }
}
```

### Read Packages
#### Fetch All Packages
```graphql
query {
  Packages {
    docs {
      id
      name
      description
      price
      expirationDate
    }
  }
}
```

### Advanced Package Filtering
#### Filter by Expiration Date
```graphql
query {
  Packages(
    where: {
      expirationDate: {
        greater_than_equal: "2024-12-02T10:10:35.906Z"
        less_than: "2024-12-07T10:10:35.906Z"
      }
    }
  ) {
    docs {
      name
      expirationDate
    }
  }
}
```

### Update Package (Admin Only)
```graphql
mutation {
  updatePackage(
    id: "package_id_here"
    data: {
      name: "Updated Package Name"
      price: 349.99
    }
  ) {
    id
    name
    price
  }
}
```

### Delete Package (Admin Only)
```graphql
mutation {
  deletePackage(
    id: "package_id_here"
  ) {
    id
  }
}
```

## Error Handling

Payload CMS provides structured error responses:
- Validation errors
- Authentication errors
- Authorization errors
- Database-related errors

Example error response:
```json
{
  "errors": [
    {
      "extensions": {
        "name": "NotFound",
        "statusCode": 404
      },
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "message": "Not Found",
      "path": [
        "deletePackage"
      ]
    }
  ],
  "data": {
    "deletePackage": null
  }
}
```

## Advanced Querying

### Sorting Packages
```graphql
query {
  Packages(
    sort: "price"  # Ascending
    limit: 10
  ) {
    docs {
      name
      price
    }
  }
}
```

### Pagination
```graphql
query {
  Packages(
    page: 2
    limit: 10
  ) {
    docs {
      id
      name
    }
    totalPages
    totalDocs
  }
}
```

## Troubleshooting

### Common Issues
- Ensure MongoDB is running
- Verify `.env` file configuration
- Check network connectivity
- Validate GraphQL query syntax

### Debugging
- Use GraphQL Playground at `/api/graphql-playground`
- Check server logs
- Verify authentication token

## Production Deployment

### Build for Production
```bash
pnpm build
pnpm start
# or
npm run build
npm run start
```
