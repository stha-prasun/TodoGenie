# 🧠 TodoGenie

TodoGenie is an AI-assisted task management web application that helps you plan your day efficiently. Users can create, update, and organize their todos — with helpful AI-generated suggestions to improve productivity.

## 🚀 Features

- ✅ Create, update, delete, and prioritize todos
- 🧠 Get intelligent suggestions for each task using AI
- 🔒 User authentication with secure JWT-based tokens
- 📦 Responsive and modern frontend built with React + Tailwind CSS
- ☁️ Backend powered by Express.js and MongoDB
- 🍪 Session support using cookies

---

## 🖼️ Tech Stack

### Frontend
- **React 19**
- **Tailwind CSS 4**
- **React Router DOM 7**
- **Redux Toolkit**
- **Axios**
- **React Hot Toast**
- **DaisyUI**

### Backend
- **Express.js**
- **MongoDB with Mongoose**
- **JWT for authentication**
- **bcrypt.js for password hashing**
- **dotenv for environment variables**
- **cookie-parser**
- **CORS**

---

## 📁 Project Structure

```
TodoGenie/
├── Backend/          # Express backend
├── Frontend/         # React frontend (Vite) 
└── README.md
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js v18+ installed
- MongoDB running locally or cloud URI (e.g., MongoDB Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/stha-prasun/TodoGenie.git
```

### 2. Setup the backend

```bash
cd .\Backend
npm install
# Create .env and add your PORT, Mongo URI and JWT_SECRET
npm run dev
```

### 3. Setup the frontend

```bash
cd cd .\Frontend
npm install
# Create .env and add your VITE_AI_API_ENDPOINT
npm run dev
```

---

## 🌐 Environment Variables

For Backend

```
PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret
```

For Frontend

```
VITE_AI_API_ENDPOINT = your_ai_endpoint
```

---

## 🤝 Contributing

Feel free to fork the repository, open issues, or submit pull requests. Feedback and suggestions are always welcome!

---

## 🧑‍💻 Author

Built with 💻 by [Prasun Shrestha](https://github.com/stha-prasun)