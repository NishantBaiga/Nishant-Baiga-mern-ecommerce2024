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
- User can view order details
- User can view order history

- Admin can add products
- Admin can delete products
- Admin can update products
- Admin can view all orders
- Admin can view order details
- Admin can fulfill orders
- Admin can cancel orders
- Admin can add, update and delete home slider image

## Tech Stack

- Frontend: React, Redux and redux-toolkit, React Router
- Backend: NodeJS, Express
- Database: MongoDB
- Styling: Tailwind CSS, Shadcn/ui
- Cloudinary for image upload

## How to Run

- Clone the repository
- Run `npm install` to install all dependencies
- Run `npm run dev` to start the development server
- Open `http://localhost:3000` in your browser

## API Endpoints

#### Auth Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `POST /api/auth/logout`: Logout a user
- `GET /api/auth/check`: Check if user is authenticated

#### Users Carts Endpoints

- `POST /api/shop/cart/add`: Add a product to cart
- `GET /api/shop/cart/get/:userId`: Get all items in cart
- `PUT /api/shop/cart/update-cart`: Update quantity of a product in cart
- `DELETE /api/shop/cart/userId/:productId`: Remove a product from cart

#### Users Order Endpoints

- `POST /api/shop/orders/create`: Place a new order
- `GET /api/shop/orders/list/:userId`: Get all orders for a user
- `GET /api/shop/orders/details/:id`: Get details of an order

#### User Address Endpoints

- `POST /api/shop/addresses/add`: Add a new address
- `GET /api/shop/addresses/get/:userId`: Get all addresses for a user
- `DELETE /api/shop/addresses/delete/:userId/:addressId`: Delete an address
- `PUT /api/shop/addresses/update/:userId/:addressId`: Update an address

#### User Products Endpoints

- `GET /api/shop/products/get`: Get all products
- `GET /api/shop/products/get/:id`: Get a single product details

#### User Reviews Endpoints

- `POST /api/shop/reviews/add`: Add a new review
- `GET /api/shop/reviews/get/:productId`: Get all reviews for a product

#### User Search Endpoints

- `GET /api/shop/search/:keyword`: Search for products

#### Admin Products Endpoints

- `POST /api/admin/products/add`: Add a new product
- `GET /api/admin/products/get`: Get all products
- `PUT /api/admin/products/edit/:id`: Update a product
- `DELETE /api/admin/products/delete/:id`: Delete a product
- `POST /api/admin/products/upload-image`: upload product image

#### Admin Orders Endpoints

- `GET /api/admin/orders/get`: Get all users orders
- `GET /api/admin/orders/details/:id`: Get details of an order
- `PUT /api/admin/orders/update/:id`: Update an order status

#### Admin Caraousel Endpoints

- `POST /api/common/feature/add`: Add a new slider image
- `GET /api/common/feature/get`: Get all slider images
- `DELETE /api/common/feature/delete/:id`: Delete a slider image

## Database Schema

The database schema is as follows:

- **users**

  - \_id (ObjectId)
  - name (String)
  - email (String)
  - password (String)
  - role (String)

- **products**

  - \_id (ObjectId)
  - image (String)
  - title (String)
  - description (String)
  - category (String)
  - brand (String)
  - price (Number)
  - salePrice (Number)
  - totalStock (Number)

- **orders**
  - \_id (ObjectId)

* userId (String)
* cartId (String)
* cartItems (Array of Objects)
  - productId (String)
  - title (String)
  - image (String)
  - price (String)
  - quantity (Number)
* addressInfo (Object)
  - addressId (String)
  - address (String)
  - city (String)
  - pincode (String)
  - phone (String)
  - notes (String)
* orderStatus (String)
* paymentMethod (String)
* paymentStatus (String)
* totalAmount (Number)
* orderDate (Date)
* orderUpdateDate (Date)
* paymentId (String)
* payerId (String)

  **carts**

  - \_id (ObjectId)
  - userId (String)
  - cartItems (Array of Objects) - productId (String) - title (String) - image (String) - price (String) - quantity (Number)

    **addresses**

  - \_id (ObjectId)
  - userId (String)
  - address (String)
  - city (String)
  - pincode (String)
  - phone (String)
  - notes (String)

    **reviews**

    - \_id (ObjectId)
    - userId (String)
    - productId (String)
    - userName (String)
    - reviewValue (Number)
    - riviewMessage (String)

- **sliderImages**
  - \_id (ObjectId)
  - image (String)

## Folder Structure

The folder structure is as follows:

- **backend**

  - **config**

    - configDb.js
    - cloudinary.js
    - paypal.js

  - **controllers**
    - admin
      -order.controller.js
  - product.controller.js
    - shop
  - cart.controller.js
  - order.controller.js
  - product.controller.js
  - review.controller.js
  - search.controller.js
    -address.controller.js

  * auth.controller.js
  * features.controller.js

  - **models**

    - address.model.js
    - cart.model.js
    - features.model.js
    - order.model.js
    - product.model.js
    - review.model.js
    - user.model.js

  - **routes**

    - admin
      - order.route.js
      - product.route.js
    - shop
      - address.route.js
      - cart.route.js
      - order.route.js
      - product.route.js
      - review.route.js
      - search.route.js
    - auth.route.js
    - features.route.js

- **frontend**

  - **public**
  - **src**
    - **config**
    - **components**

      - admin-view
        - header.jsx
        - image-upload.jsx
        - layout.jsx
        - orderDetails.jsx
        - orders.jsx
        - product-tile.jsx
        - sidebar.jsx
      - shopping-view
        - address.jsx
        - addressCard.jsx
        - cart-item-content.jsx
        - cart-wrapper.jsx
        - filter.jsx
        - header.jsx
        - layout.jsx
        - orderDetails.jsx
        - orders.jsx
        - product-details.jsx
        - product-tile.jsx
      - auth
        - layout.jsx
      - common
        - check-auth.jsx
        - form.jsx
        - star-rating.jsx

    - **pages**
      - auth
        - login.jsx
        - register.jsx
      - admin-view
        - dashboard.jsx
        - orders.jsx
        - products.jsx
        - features.jsx
      - shopping-view
        - account.jsx
        - checkout.jsx
        - home.jsx
        - listing.jsx
        - paypal-success.jsx
        - paypal-return.jsx
        - search.jsx
      - not found
      - unauth-page
    - **store**

      - admin
        - order-slice
        - product-slice
      - authslice
      - features-slice
      - shop
        - address-slice
        - cart-slice
        - order-slice
        - product-slice
        - review-slice
        - search-slice

    - store.js

    - App.jsx
    - index.css
    - main.jsx

- **README.md**
