<h1>Password Manager API</h1>

This is a simple API for managing passwords using Node.js, Express, and MongoDB. The application supports CRUD operations for password management.

<h2>Features</h2>

-->Add a new password

-->Fetch all saved passwords

-->Update an existing password by its ID

-->Delete a password by its ID

<h2> Prerequisites</h2>

-->Ensure you have the following installed on your system:

-->Node.js (v14 or later)

-->MongoDB (local or cloud-based)


URL: GET /<br>
Description: Retrieves all saved passwords.<br>
[
  {
    "_id": "60d5f9f5d6e5a45a2437a59b",
    "site": "example.com",
    "username": "user1",
    "password": "password123"
  }
]

URL: POST / <br>
Description: Saves a new password.<br>
{
  "site": "example.com",
  "username": "user1",
  "password": "password123"
}
<h2>Response:</h2>
{
  "success": true,
  "result": { ... }
}










# Secret_Code
# React + Vite
