# E-commerce Website

This is an e-commerce website built using React, Redux, NodeJS, Express and MongoDB.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [How to Run](#how-to-run)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Folder Structure](#folder-structure)

## Features

- User authentication
- User can add products to cart
- User can view cart items
- User can place order
- User can view order history
- Admin can add products
- Admin can view all orders
- Admin can view all users
- Admin can delete products
- Admin can fulfill orders

## Tech Stack

- Frontend: React, Redux, React Router
- Backend: NodeJS, Express
- Database: MongoDB
- Styling: Tailwind CSS

## How to Run

- Clone the repository
- Run `npm install` to install all dependencies
- Run `npm run dev` to start the development server
- Open `http://localhost:3000` in your browser

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `POST /api/cart/add`: Add a product to cart
- `GET /api/cart/items`: Get all items in cart
- `POST /api/orders/place`: Place a new order
- `GET /api/orders/history`: Get all orders for a user
- `GET /api/products`: Get all products
- `POST /api/products/add`: Add a new product
- `DELETE /api/products/:id`: Delete a product
- `GET /api/users`: Get all users
- `GET /api/orders/fulfill/:id`: Fulfill an order

## Database Schema

The database schema is as follows:

- **users**
	+ _id (ObjectId)
	+ name (String)
	+ email (String)
	+ password (String)
	+ role (String)
- **products**
	+ _id (ObjectId)
	+ name (String)
	+ price (Number)
	+ description (String)
	+ image (String)
	+ category (String)
- **orders**
	+ _id (ObjectId)
	+ userId (ObjectId)
	+ products (Array of Objects)
		- productId (ObjectId)
		- quantity (Number)
	+ total (Number)
	+ status (String)

## Folder Structure

The folder structure is as follows:

- **backend**
	+ **controllers**
		- auth.controller.js
		- order.controller.js
		- product.controller.js
		- user.controller.js
	+ **database**
		- db.js
		- models
			- order.model.js
			- product.model.js
			- user.model.js
	+ **routes**
		- auth.route.js
		- order.route.js
		- product.route.js
		- user.route.js
	+ **utils**
		- auth.utils.js
		- logger.utils.js
	+ app.js
	+ server.js
- **frontend**
	+ **components**
		- admin-view
			- admin-header.jsx
			- admin-sidebar.jsx
			- product-tile.jsx
		- shopping-view
			- cart-wrapper.jsx
			- header.jsx
			- layout.jsx
			- product-details.jsx
			- product-tile.jsx
	+ **pages**
		- admin-view
			- dashboard.jsx
			- orders.jsx
			- products.jsx
			- users.jsx
		- shopping-view
			- cart.jsx
			- checkout.jsx
			- home.jsx
			- login.jsx
			- order-success.jsx
			- product.jsx
			- register.jsx
	+ **store**
		- auth-slice.js
		- cart-slice.js
		- features-slice.js
		- order-slice.js
		- product-slice.js
		- review-slice.js
		- user-slice.js
	+ **utils**
		- toast.utils.js
	+ App.jsx
	+ index.jsx
- **images**
- **package.json**
- **README.md**
