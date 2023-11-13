This project is an Express application showcasing CRUD operations using RESTful API endpoints for users and products, along with basic user authentication.

Setup:

Clone the repository:

bash

git clone 
Navigate to the project directory:

bash
Copy code
cd WEB322-M.C 
Install dependencies:

bash
Copy code
npm install
Usage:

Start the server:

bash
Copy code
node server.js
The application will be accessible at http://localhost:3000.

API Endpoints:

Users Endpoints:

Get All Users:

bash
Copy code
GET /api/users
Get User by ID:

bash
Copy code
GET /api/users/:id
Delete User by ID:

bash
Copy code
DELETE /api/users/:id
Add a New User:

bash
Copy code
POST /api/users
Products Endpoints:

Get All Products:

bash
Copy code
GET /api/products
Get Product by ID:

bash
Copy code
GET /api/products/:id
Delete Product by ID:

bash
Copy code
DELETE /api/products/:id
Add a New Product:

bash
Copy code
POST /api/products
Authentication:

Authenticate User:
bash
Copy code
POST /api/login
Accepts email and password in the request body. Returns { isAuthenticated: true } if the user exists and is an admin; otherwise, returns a 401 status with { isAuthenticated: false }.
Verify API Operations:

use the following cURL commands to verify if the API operations are working correctly:

Users:

Get All Users:

bash
Copy code
curl http://localhost:3000/api/users
Get User by ID:

bash
Copy code
# Replace :id with the actual user ID
curl http://localhost:3000/api/users/:id
Delete User by ID:

bash
Copy code
# Replace :id with the actual user ID
curl -X DELETE http://localhost:3000/api/users/:id
Add a New User:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@doe.com\",\"password\":\"johndoe\",\"dob\":\"1990-01-01T00:00:00.000Z\",\"company\":\"John Doe\",\"phone\":\"123-456-7890\"}" http://localhost:3000/api/users
Products:

Get All Products:

bash
Copy code
curl http://localhost:3000/api/products
Delete Product by ID:

bash
Copy code
# Replace :id with the actual product ID
curl -X DELETE http://localhost:3000/api/products/:id
Add a New Product:

bash
Copy code
curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"Sample Product\",\"de

Credits
This project was part of the web322 class by Mashuda.
