import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";

import "./App.css";

function App() {
  return (
    <>
      <div>
        <header>Header</header>
        <div className="body">
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

            {/* Protected dashboard route */}
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />
            <Route path="/dashboard/create" element={<ProductCreate />} />
            <Route path="/dashboard/:id" element={<ProductDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
