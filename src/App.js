import { Routes, Route, Navigate } from "react-router-dom";

import Books from "./pages/Books";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const isLoggedIn = Boolean(token);
  const isAdmin = user?.role === "admin";

  return (
    <>
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* ROOT AUTO REDIRECT */}
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" replace />
            ) : isAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/books" replace />
            )
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login />
            ) : isAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/books" replace />
            )
          }
        />

        {/* USER BOOKS PAGE (DO NOT REMOVE) */}
        <Route
          path="/books"
          element={
            isLoggedIn ? <Books /> : <Navigate to="/login" replace />
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            isLoggedIn && isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
