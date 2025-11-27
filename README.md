npm install
1. Login


POST /login
Request:

{
  "username": "sales",
  "password": "admin123"
}


Response:

{
  "status": "success",
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": 1,
      "username": "haikal"
    },
    "token": "eyJhbGc..."
  }
}


2. Mendapatkan data user dari token

GET /me

Header:

Authorization: Bearer <access_token_dari_login>


Response:

{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "username": "sales"
    }
  }
}
