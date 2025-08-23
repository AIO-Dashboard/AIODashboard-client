# AIODashboard-server

🗄️ Express + MongoDB Backend (Orders API)

This is the backend API for [AIODashboard](https://aiodashboard.netlify.app/) — a React-based frontend application.  
Built with **Express.js** and **MongoDB (Mongoose)**, deployed on **Render.com** with GitHub integration.

---

## 📂 Features

- Express.js backend
- MongoDB Atlas database with Mongoose (aiodashboarddb)
- Secure `.env` config
- CORS enabled for frontend
- Deployed on Render.com

---

## 🚀 Live Demo

🔗 [AIODashboard-server](https://aiodashboard-server.onrender.com/api/orders) and more (Hosted on Render)
🔗 [AIODashboard Frontend](https://aiodashboard.netlify.app/) (Hosted on Netlify)
Frontend Repository: 🔗 [Github](https://github.com/AIO-Dashboard/AIODashboard-client)

Other endpoints:
🔗 https://aiodashboard-server.onrender.com/api/products (in development)
🔗 https://aiodashboard-server.onrender.com/api/users (in development)

---

## 🛠️ Setup

1. Clone repo

   ```bash
   git clone https://github.com/<your-username>/AIODashboard-server.git
   cd AIODashboard-server
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment
   Create your .env with your MongoDB URI + PORT

   ```bash
   Example:
   PORT=5000
   MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/aiodashboarddb
   ```

4. Start development server
   ```bash
   npm run dev
   ```
