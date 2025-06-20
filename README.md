# MERN E-commerce 2024

A full-stack e-commerce application built with MongoDB, Express, React, and Node.js.

![image](https://github.com/user-attachments/assets/3ae6600b-05fa-45b0-a545-c800ea81985c)

![image](https://github.com/user-attachments/assets/08088b6d-00f4-47c1-829d-d303136df5ff)

![image](https://github.com/user-attachments/assets/e47bcc94-ebfc-4f6d-a72b-d7c5113041c0)

![image](https://github.com/user-attachments/assets/f7abe955-755a-4083-a122-b0f2a8a594d3)

![image](https://github.com/user-attachments/assets/ecb813ac-664d-40a6-958e-7f957ca2c461)
---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Implementation Details](#implementation-details)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Endpoints Overview](#api-endpoints-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication:** Register, login, logout, JWT-based authentication, and protected routes.
- **Product Management:** List, add, update, and delete products (admin only).
- **Shopping Cart:** Add to cart, update quantities, remove items, and persist cart for logged-in users.
- **Order Management:** Place orders, view order history, and admin order management.
- **Product Reviews:** Users can add and view reviews for products.
- **Address Management:** Save and manage shipping addresses.
- **Payment Integration:** Supports PayPal and Razorpay for secure payments.
- **Admin Dashboard:** Manage products, orders, and users.
- **Responsive UI:** Built with React and Tailwind CSS for a modern, mobile-friendly experience.
- **API Security:** Uses JWT, cookies, and CORS for secure API access.
- **Cloudinary Integration:** For product image uploads (if implemented).
- **Search & Filtering:** Search products and filter by category, price, etc.

---

## Project Structure

```
mern-ecommerce-2024-master/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI and feature components
│   │   ├── pages/        # Page-level components (routes)
│   │   ├── store/        # Redux store and slices
│   │   ├── assets/       # Images and static assets
│   │   └── ...
│   ├── public/
│   └── ...
├── server/           # Node.js/Express backend
│   ├── controllers/  # Route controllers (admin, auth, shop, common)
│   ├── models/       # Mongoose models
│   ├── routes/       # Express routes
│   ├── helpers/      # Utility/helper functions (cloudinary, payment)
│   ├── server.js     # Main server file
│   └── ...
├── .env.example      # Example environment variables
└── README.md
```

---

## Tech Stack

- **Frontend:** React, Redux, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JWT, Cookies
- **Payments:** PayPal, Razorpay
- **Image Uploads:** Cloudinary (optional)

---

## Implementation Details

### Backend (Express + MongoDB)
- **Authentication:** Uses JWT tokens stored in HTTP-only cookies for secure authentication.
- **Models:** Mongoose models for User, Product, Order, Review, etc.
- **Routes:** Modular route files for authentication, admin, shop, and common features.
- **Controllers:** Business logic separated into controllers for maintainability.
- **Payment:** Integrates with PayPal and Razorpay APIs for order payments.
- **Image Uploads:** (If enabled) Uses Cloudinary for storing product images.
- **CORS:** Configured to allow requests from the frontend during development.

### Frontend (React + Redux)
- **State Management:** Redux Toolkit for global state (auth, cart, products, etc.).
- **Routing:** React Router for client-side navigation.
- **UI:** Tailwind CSS for fast, responsive design.
- **API Calls:** Uses Axios or Fetch for communication with the backend.
- **Authentication:** Handles JWT tokens and user sessions.
- **Admin Panel:** Separate routes and components for admin features.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- PayPal and/or Razorpay developer accounts (for payments)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/msaswata15/mernecom.git
   cd mernecom
   ```

2. **Install dependencies for both client and server:**
   ```sh
   cd server && npm install
   cd ../client && npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` in the `server` folder and fill in your values.

---

## Environment Variables

Create a `.env` file in the `server` directory based on `.env.example`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.0me7l.mongodb.net/<dbname>
PORT=5000
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Running the App

### Development

#### Server
```sh
cd server
npm start
```

#### Client
```sh
cd client
npm run dev
```

- The client runs on [http://localhost:5173](http://localhost:5173)
- The server runs on [http://localhost:5000](http://localhost:5000)

### Production

Build the client and serve it with a production server or static host.

---

## API Endpoints Overview

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login user
- `GET /api/auth/logout` — Logout user

### Products
- `GET /api/shop/products` — List products
- `GET /api/shop/products/:id` — Product details
- `POST /api/admin/products` — Add product (admin)
- `PUT /api/admin/products/:id` — Update product (admin)
- `DELETE /api/admin/products/:id` — Delete product (admin)

### Cart & Orders
- `GET /api/shop/cart` — Get user cart
- `POST /api/shop/cart` — Add to cart
- `POST /api/shop/order` — Place order
- `GET /api/shop/order` — Get user orders

### Reviews
- `POST /api/shop/review` — Add product review
- `GET /api/shop/review/:productId` — Get reviews for a product

### Admin
- `GET /api/admin/orders` — List all orders
- `GET /api/admin/products` — List all products

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

MIT
