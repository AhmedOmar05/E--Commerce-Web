# E-Commerce MERN Stack Platform

![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Express](https://img.shields.io/badge/Backend-Express.js-blue)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-green)
![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)

A full-stack e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). Supports user authentication, product management, shopping cart functionality, and Stripe payment processing.

---

## ✨ Features

### User Features
- User registration & login (JWT authentication)
- Profile management (update email, name, profile picture)
- Secure logout with HTTP-only cookies
- Role-based access (admin/customer)

### Product Features
- Product upload with multiple images (Multer file handling)
- Product search, filtering by category, and price display
- Dynamic product catalog with categories

### Cart & Order Features
- Add/remove products to/from cart
- Real-time cart item quantity updates
- Checkout system with Stripe payment integration
- Order history tracking

### Admin Features
- View all registered users
- Update user roles (e.g., promote to admin)
- Manage product inventory

---

## 🚀 Installation

### Prerequisites
- Node.js v16+
- MongoDB Atlas URI or local MongoDB instance
- Stripe API key

### Setup Steps

#### Clone the repository

git clone https://github.com/Maverick1950/Ecommerce-MERN-.git
cd Ecommerce-MERN-


#### Backend Setup

cd backend
npm install


#### Configure Environment Variables

Create `.env` file in backend directory:

MONGOdb_URI=your_mongodb_uri
TOKEN_SECRET_KEY=your_jwt_secret
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_key


#### Frontend Setup

cd ../frontend
npm install


#### Run the Application

In backend directory:
npm start

In frontend directory:
npm start


---

## 🔧 Environment Variables

| Variable           | Description                   | Example                        |
|--------------------|-------------------------------|--------------------------------|
| MONGOdb_URI        | MongoDB connection string     | mongodb+srv://user:pass@cluster|
| TOKEN_SECRET_KEY   | JWT token signing key         | super_secret_key_123           |
| FRONTEND_URL       | React app URL                 | http://localhost:3000          |
| STRIPE_SECRET_KEY  | Stripe payment processing key | sk_test_...                    |

---

## 📚 API Endpoints

### Authentication

| Method | Route              | Description      |
|--------|--------------------|------------------|
| POST   | /api/signup        | User registration|
| POST   | /api/signin        | User login       |
| GET    | /api/userLogout    | User logout      |

### User Management

| Method | Route              | Description         |
|--------|--------------------|---------------------|
| GET    | /api/user-details  | Get current user info|
| GET    | /api/all-user      | Get all users (admin only)|
| POST   | /api/update-user   | Update user profile |

### Product Management

| Method | Route                | Description            |
|--------|----------------------|------------------------|
| POST   | /api/upload-product  | Add new product (admin)|
| GET    | /api/get-product     | List all products      |
| POST   | /api/filter-product  | Filter by category     |
| GET    | /api/search          | Search products        |

### Cart Operations

| Method | Route                     | Description             |
|--------|---------------------------|-------------------------|
| POST   | /api/addtocart            | Add item to cart        |
| GET    | /api/view-card-product    | View cart contents      |
| POST   | /api/update-cart-product  | Modify cart quantity    |
| POST   | /api/delete-cart-product  | Remove item from cart   |

### Orders & Payments

| Method | Route          | Description                |
|--------|----------------|----------------------------|
| POST   | /api/checkout  | Process Stripe payment     |

---

## 🛠 Technologies Used

- **Frontend:** React, React Router, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Payment Processing:** Stripe API
- **File Upload:** Multer middleware
- **Security:** HTTP-only cookies, CORS

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch:
    ```
    git checkout -b feature/your-feature
    ```
3. Commit changes:
    ```
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```
    git push origin feature/your-feature
    ```
5. Open a Pull Request

**Please ensure all features are tested before submitting PRs**

---

## 📄 License

The MIT License (MIT)
Copyright © 2025 Tanishq Tyagi and Swastik Verma

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

