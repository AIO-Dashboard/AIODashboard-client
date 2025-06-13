import { Routes, Route, Navigate } from "react-router-dom";

import "./App.module.scss";

// TODO Use Dynamic imports and lazy loading later along with other optimization techniques
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Main/Dashboard/Dashboard";
import Products from "./pages/Main/Products/Products";
import ProductCreate from "./pages/ProductCreate";
import ProductDetail from "./pages/ProductDetail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Header from "./components/Header/Header";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./context/AuthContext/AuthContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Toast from "./components/Toast/Toast";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {/* <div> */}
      <Toast />
      <Header />
      <Sidebar />
      <main>
        <Routes>
          {/* Always redirect "/" to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* If logged in, redirect from /login to /dashboard */}
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          {/* Protected dashboard routes */}

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* </div> */}
      <footer>@AIO Dashboard 2025</footer>
    </>
  );
}

export default App;
