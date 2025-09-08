# AIODashboard

📊 **AIODashboard** is a responsive, modern admin dashboard built with **React**, **TypeScript**, **Material UI**, and **Recharts** — designed to showcase clean UI, data visualization, and component-based architecture.  
It includes dynamic KPI cards, sales trends, customer insights, and inventory health — all displayed using API data from the backend.

---

## 🚀 Live Demo

🔗 [AIODashboard Frontend](https://aiodashboard.netlify.app/) (Hosted on Netlify)

🔗 [AIODashboard-server Orders (Backend API)](https://aiodashboard-server.onrender.com/api/orders) (Hosted on Render)

Backend Repository: 🔗 [Github](https://github.com/AIO-Dashboard/AIODashboard-server)

---

## 🛠️ Tech Stack

- ⚛️ **React**
- 🟦 **TypeScript**
- 🎨 **Material UI**
- 📊 **Recharts**
- 🔗 **Dummyjson**
- 🛣️ **React Router**
- 💅 **Styled Components**
- ⚡ **Vite**
- 🎀 **Sass**
- ✅ **ESLint**
- 🌐 **Netlify**
- 🔗 **GitHub**
- 🖼️ **Simpleicons**

---

## 📂 Features Overview

- Responsive React + TypeScript dashboard
- Material UI components & theming
- Persistent caching with React-Query
- Interactive charts with Recharts
- KPI cards and sales/insights visualization
- API integration with AIODashboard-server
- Routing with React Router
- Modular styling (Sass + Styled Components)
- Deployed on Netlify

---

## 🛠️ Setup

1. Clone repo

   ```bash
   git clone https://github.com/<your-username>/AIODashboard-client.git
   cd AIODashboard-client
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start development server
   ```bash
   npm run dev
   ```

## 📂 More Features

- Tanstack/React-Query
  caching & caching persistence - avoids refetching data unnecessarily. API call once, data saved. Reloads dont trigger fetches.
  staleTime & gcTime - sets expiration of the cached data. (3 & 5 min in-memory cache, 1hr inactivity storaged persistent cache).
  refreshInterval - triggers the fetch every set time (5min)

<!-- /////////////  -->

#⚡ Performance Optimizations Applied (in-progress)

## Rendering

- Virtualized long lists (infinite scroll)(react-window, react-virtualize)
- avoided deeply nested JSX/props

## Unnecessary render/update optimizations

- useMemo(), useCallback(), React.memo()
- no anonymous functions in JSX

## Deprioritization

- useTransition(), useDeferredValue()

## Component optimizations

- Code-split & Lazy loaded
- Split up large components

## State Management optimizations

- Lift state up sparingly. Use on a need-to-know basis.
- Avoided prop-drilling
- Normalized and sliced - kept state atomic. Used nested state sparingly.

## Network & API optimizations

- Debouncing / throttling
- Cached API response data. Persistently with sessionStorage.

## Build optimizations

- Tree shake - imported only what's necessary
- Minified, compressed or used a CDN for assets
- Production build
