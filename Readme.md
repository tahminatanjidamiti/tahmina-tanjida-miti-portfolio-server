# 🖥️ Tahmina Tanjida Miti — Portfolio Server

A lightweight, secure, and fully structured backend API for the **Portfolio Website**, built with **Node.js**, **Express**, **TypeScript**, and **Postgresql** with **Prisma**.

# 🌐 Live Link
[https://tahmina-tanjida-miti-portfolio-serv.vercel.app/](https://tahmina-tanjida-miti-portfolio-serv.vercel.app/)

## 🚀 Features

### 🔐 Authentication & Authorization
- 🎯 Secure Password Hashing using bcrypt

### 🧱 Clean Architecture
- MVC pattern with modular folder structure  
- Centralized error handling and response formatting

### 🔐 API Security
- CORS enabled

# 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Postgresql + Prisma**
- **dotenv**
- **CORS**
- **Postman** for API testing
- **Vercel** for deployment

---

# 📁 Project Structure

```txt
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── app/
│   ├── generated/
│   ├── modules/
│   ├── app.ts
│   └── server.ts
├── package.json
├── Tahmina Tanjida Miti Portfolio APIs.postman_collection.json
├── tsconfig.json
└── vercel.json

```
## 🔍 Notes

- Backend uses Node.js + Express + Prisma + TypeScript
- Contains Prisma schema and migration folder
- src/modules contains feature-wise modular logic
- generated/likely Prisma client
- Includes Postman collection 


## 📡 API Endpoints

### Users
- `POST /api/v1/user` Register a new user
- `GET /api/v1/user` Get all users
- `GET /api/v1/user/:id` Get single user
- `PATCH /api/v1/user/:id` Update user
- `DELETE /api/v1/user/:id` Delete user
---


### Auth
- `POST /api/v1/auth/login` Login with Credentials
- `POST /api/v1/auth/google` Login with Google
---

### Blogs
- `POST /api/v1/post` Register a new blog
- `GET /api/v1/post` Get all blogs
- `GET /api/v1/post/stats` Get blogs stats for admin
- `GET /api/v1/post/:id` Get single blog
- `PATCH /api/v1/post/:id` Update blog
- `DELETE /api/v1/post/:id` Delete blog
---
### Projects
- `POST /api/v1/project` Register a new project
- `GET /api/v1/project` Get all projects
- `GET /api/v1/project/stats` Get projects stats for admin
- `GET /api/v1/project/:id` Get single project
- `PATCH /api/v1/project/:id` Update project
- `DELETE /api/v1/project/:id` Delete project
---

## 🧹 Code Quality
- TypeScript interfaces for type safety.
- Centralized error handling.

## ✅ Status
Project is functional and under active development.