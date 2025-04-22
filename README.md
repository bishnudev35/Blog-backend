# 📝 Blog Application

This is a backend-only blog application built using **Node.js**, **Express**, **Prisma**, and **JWT** for authentication. The app allows users to create and manage their blogs securely.

---

## 📦 Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL 
- **Authentication:** JWT (JSON Web Token)
- **ORM:** Prisma
- **Package Manager:** npm

---

## 🚀 Features

- User registration & login with JWT authentication
- Middleware-based protected routes
- Blog creation and listing for authenticated users
- Database interaction using Prisma ORM

---

## 🔧 Installation & Setup

Follow these steps to run the project locally:

1. **Clone the Repository**
2.**Install Dependencies**
   using npm install
3**Create .env File**
   DATABASE_URL="your_database_url_here"
   JWT_SECRET="your_jwt_secret_here"
   PORT=5000
   
4**Set Up Prisma**
  npx prisma init          # If Prisma isn't initialized
  npx prisma migrate dev   # Create DB tables and apply migrations
  npx prisma generate      # Generate Prisma client
  npx db push
5**Run the Project**
  using npm run dev

6 ** Project Structure**
   ├── lib/
   │   └── db.js               # Prisma DB setup
   ├── middleware/
   │   └── auth.middleware.js  # JWT authentication middleware
   ├── routes/
   │   └── blog.routes.js      # Blog-related routes
   ├── .env                    # Environment variables
   ├── index.js                # Application entry point
   └── README.md               # Project documentation



