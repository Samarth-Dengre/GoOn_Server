## GoOn

Go.On is the perfect platform for your online shopping needs,
offering a unique and innovative approach to ecommerce. With
Go.On, we empower users to choose the shop from which they want to
shop, giving them the flexibility and freedom to explore a wide
range of options.

## Tech Stack

**Client:** NextJS(13.4), Typescript

**Server:** NodeJS, NestJS, MongoDB

**Frontend Repo:** https://github.com/Samarth-Dengre/GoOn_Client

## Run Locally

Clone the project

```bash
  git clone https://github.com/Samarth-Dengre/GoOn_Server my-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`JWT_SECRET`

# API Reference

### Seeding database endpoint

- **URL**: `/seeds`
- **Method**: `GET`
- **Description**: This endpoint is to seed the database. By default, this route is disabled. To enable it, you need to go to app.module.ts and uncomment the import.

### Signup Endpoint

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Description**: This endpoint is for the signup of new user
- **Body**:
  - `userName` (type: string, required)
  - `email` (type: string, required)
  - `password` (type: string, required)
  - `confirmPassword` (type: string, required)
- **Response**:
  - **Status Code**: 201 (OK)
  - **Body**:
    | Key | Type | Value |
    |-------|-----------|------|
    | message | Array | ['Signed up successfully'] |

### Login Endpoint

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: This endpoint is for login
- **Body**:
  - `email` (type: string, required)
  - `password` (type: string, required)
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:  
    | Key | Type | Value |
    |-------|-----------|------|
    | message | Array | ['Logged in successfully'] |
    | user | object | |
    | token | string | |
    | cartSize| number| |

### Validate Token Endpoint

- **URL**: `/auth/login`
- **Method**: `GET`
- **Description**: This endpoint is used to validate and refresh the token stored in localstorage to authenticate user without logging in again.
- **Headers**:
  | Key | Type | Value |
  |-------|-----------|------|
  | authentication | string | 'Bearer YOUR_TOKEN' |
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:  
    | Key | Type | Value |
    |-------|-----------|------|
    | message | Array | ['Logged in successfully'] |
    | user | object | |
    | token | string | |
    | cartSize| number| |

### Fetch All Stores Endpoint

- **URL**: `/stores`
- **Method**: `GET`
- **Description**: This endpoint is to fetch all the stores
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
    | Key | Type |
    |-------|----------|
    | stores| Array |

### Fetch stores by category

- **URL**: `/categories/?category="CATEGORY"`
- **CATEGORY**:
  |category|for|
  |-|-|
  |1|electronics|
  |2|fashion|
  |3|grocery|
  |4|furniture|
  |5|mobile-laptops|
  |7|beauty|
  |8|home-kitchen|
  |9|footwear|
- **Method**: `GET`
- **Description**: This endpoint is to fetch stores by category
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
    | Key | Type | Value |
    |-------|-----------|------|
    | message | string | 'Stores fetched successfully' |
    |categoryStores| Array| |

### Fetch store by id

- **URL**: `/stores/id`
- **Method**: `GET`
- **Description**: This endpoint is for fetching store by id
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
    | Key | Type | Value |
    |-------|-----------|------|
    | message | string | 'Signed up successfully' |
    |store|object||

### Fetch Product By id and store_id

- **URL**: `/products/id/?store_id="STORE_ID`
- **Method**: `GET`
- **Description**: This endpoint is for fetching store by id
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
    | Key | Type | Value |
    |-------|-----------|------|
    | msg | string | 'Signed up successfully' |
    |store|object||

### Rate The product

- **URL**: `/products/rate`
- **Method**: `POST`
- **Description**: This endpoint is to rate a product
- **Headers**:
  | Key | Type | Value |
  |-------|-----------|------|
  | authentication | string | 'Bearer YOUR_TOKEN' |
- **Body**:
  - `product_id` (type: string, required)
  - `rating` (type: number, required)
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
    | Key | Type | Value |
    |-------|-----------|------|
    | msg | array | ['Product rated successfully'] |

### Add Product to Cart

- **URL**: `/users/cart`
- **Method**: `POST`
- **Description**: This endpoint is to add a product to cart
- **Headers**:
  | Key | Type | Value |
  |-------|-----------|------|
  | authentication | string | 'Bearer YOUR_TOKEN' |
- **Body**:
  - `product` (type: string, required)
  - `quantity` (type: number, required)
  - `seller` (type: string, required)
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
    | Key | Type | Value |
    |-------|-----------|------|
    | message | array | ['Cart updated successfully!'] |

### Fetch the cart

- **URL**: `/users/cart`
- **Method**: `GET`
- **Description**: This endpoint is to add a product to cart
- **Headers**:
  | Key | Type | Value |
  |-------|-----------|------|
  | authentication | string | 'Bearer YOUR_TOKEN' |
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
    | Key | Type | Value |
    |-------|-----------|------|
    | message | array | ['Cart retrieved successfully!'] |

### Place Order

- **URL**: `/orders`
- **Method**: `POST`
- **Description**: This endpoint is to place the order for items in cart
- **Headers**:
  | Key | Type | Value |
  |-------|-----------|------|
  | authentication | string | 'Bearer YOUR_TOKEN' |
- **Body**:
  - `modeOfPayment` (type: string, required)
  - `deliveryAddress` (type: object, required)
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
    | Key | Type | Value |
    |-------|-----------|------|
    | msg | array | ['Order Placed Successsfully'] |

### Fetch all orders

- **URL**: `/orders`
- **Method**: `GET`
- **Description**: This endpoint is to fetch all the orders placed by user
- **Headers**:
  | Key | Type | Value |
  |-------|-----------|------|
  | authentication | string | 'Bearer YOUR_TOKEN' |
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
    | Key | Type |
    |-------|----------|
    | orders | array |

### Fetch order details by id

- **URL**: `/orders/id`
- **Method**: `GET`
- **Description**: This endpoint is to rate a product
- **Headers**:
  | Key | Type | Value |
  |-------|-----------|------|
  | authentication | string | 'Bearer YOUR_TOKEN' |
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
    | Key | Type |
    |-------|-----------|
    | order | object |
