# Lead Scoring Backend – Hapi.js

Backend ini dibuat menggunakan Node.js + Hapi.js untuk menyediakan fitur autentikasi pengguna serta penyediaan data hasil prediksi Machine Learning. Data prediksi diambil dari file predicted.csv yang telah disiapkan oleh server, kemudian disajikan kepada frontend melalui REST API dengan dukungan pagination.

## 🚀 Features

User Authentication (JWT)

Protected User Session (/me)

Lead Scoring Data Loader

Struktur modul backend yang terorganisir

## 📁 Project Structure
```
src/
│── api/
│   ├── auth/          # Modul login dan validasi user
│   └── leads/         # Modul load predicted.csv + pagination
│
│── services/
│   ├── UsersService.js
│   └── LeadsService.js
│
│── data/
│   └── predicted.csv  # File prediksi hasil model ML
│
│── exceptions/
│── tokenize/
│── server.js
```

## ⚙️ How It Works
1. Authentication

Backend menyediakan login berbasis username dan password.
Jika valid, server mengembalikan JWT token untuk mengakses endpoint lain.

2. Lead Prediction Data

Pada saat server dijalankan, backend membaca file predicted.csv.

Data CSV diubah menjadi JSON dan disimpan di memory.

Setiap baris CSV otomatis diberikan rank.

Data dikirimkan melalui endpoint /leads dengan pagination.

## 📌 API Endpoints
### 1. POST /login

Login pengguna dan menghasilkan JWT token.

Body:
```
{
  "username": "string",
  "password": "string"
}
```

Response:
```
{
  "status": "success",
  "data": {
    "user": { "id": 1, "username": "example" },
    "token": "jwt-token"
  }
}
```
### 2. GET /me

Mengembalikan informasi user berdasarkan JWT.

Header:
```
Authorization: Bearer <token>
```

Response:
```
{
  "status": "success",
  "data": {
    "user": { "id": 1, "username": "example" }
  }
}
```
### 3. GET /leads

Mengambil data prediksi dari predicted.csv dalam bentuk JSON.

Query Parameters:

Parameter	Deskripsi	Default
page	Halaman data	1
limit	Jumlah data per halaman	10

Response Example:
```
{
  "status": "success",
  "data": {
    "leads": [
      {
        "rank": 1,
        "age": "53",
        "job": "management",
        "marital": "married",
        "education": "university.degree",
        "skor": "0.68"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 452,
      "totalPages": 46
    }
  }
}
```
## 🔐 Security

Autentikasi menggunakan JWT

Validasi kredensial pengguna

Error handling dengan custom exception (ClientError)

CSV data bersifat read-only, tidak dapat diubah user

## 🛠️ Installation
1. Clone Repository
```
git clone <repository-url>
cd <project-folder>
```
3. Install Dependencies
```
npm install
```
5. Setup Environment Variables

Buat file .env:
```
PORT=5000
JWT_ACCESS_TOKEN_KEY=your_secret_key
JWT_ACCESS_TOKEN_AGE=1800
DATABASE_URL=your_postgres_url
```
4. Start Server
```
npm run dev
```
## 📘 Notes

File predicted.csv digunakan sebagai sumber data utama prediksi.

Backend tidak menjalankan model Machine Learning.
Semua perhitungan dilakukan sebelumnya dan CSV hanya dibaca & ditampilkan.

Pagination membantu frontend menangani dataset besar.
