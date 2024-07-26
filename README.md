# Project Name
## Overview
This project is a backend application built with Node.js and Express. It includes features for managing Puja posts, user profiles, and payments. The application interacts with a third-party API for payment processing and maintains records in a MongoDB database.  
## Features
- User Authentication and Authorization
- CRUD operations for Puja posts
- User profile management
- Payment record management
- CORS support
## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- Zod for schema validation
- bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication
- Vercel for deployment
## Installation
1. Clone the repository:
    <pre>git clone https://github.com/yourusername/your-repo-name.git cd your-repo-name </pre>
2. Install dependencies:  <pre>npm install </pre>
3. Set up environment variables: Create a .env file in the root directory and add the following:  <pre>MONGODB_URI=your_mongodb_uri ACCESS_TOKEN_SECRET=your_access_token_secret REFRESH_TOKEN_SECRET=your_refresh_token_secret </pre>
4. Start the server:  <pre>npm start </pre>
## API Endpoints
### Authentication
- POST /auth/register - Register a new user
- POST /auth/login - Login a user
### Puja Posts
- POST /puja - Create a new Puja post
- GET /puja/:id - Get a Puja post by ID
- PUT /puja/:id - Update a Puja post by ID
- DELETE /puja/:id - Delete a Puja post by ID
### User Profiles
- POST /profile - Create a new user profile
- GET /profile/:id - Get a user profile by ID
- PUT /profile/:id - Update a user profile by ID
### Payments
- POST /payment - Create a new payment record
- GET /payment/:id - Get a payment record by ID
## Deployment
This project is hosted on Vercel. To deploy your own version:
1. Install the Vercel CLI:  <pre>npm install -g vercel </pre>
2. Deploy the project:
<pre>vercel </pre>
# License
This project is licensed under the MIT License. See the LICENSE file for details.