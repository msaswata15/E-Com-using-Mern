# MERN E-commerce 2024

A full-stack e-commerce application built with MongoDB, Express, React, and Node.js.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [API Endpoints Overview](#api-endpoints-overview)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication (login/register)
- Product listing and details
- Shopping cart and checkout
- Admin dashboard for product/order management
- Order history and reviews
- Address management
- Secure payments (PayPal, Razorpay)
- Responsive UI with React and Tailwind CSS

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
└── README.md
```

## Tech Stack
- **Frontend:** React, Redux, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JWT, Cookies
- **Payments:** PayPal, Razorpay

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/msaswata15/mernecom.git
   cd mernecom
   ```
2. Install dependencies for both client and server:
   ```sh
   cd server && npm install
   cd ../client && npm install
   ```
3. Copy `.env.example` to `.env` in the `server` folder and fill in your values.

## Environment Variables
Create a `.env` file in the `server` directory based on `.env.example`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.0me7l.mongodb.net/<dbname>
PORT=5000
```

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

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License
MIT
