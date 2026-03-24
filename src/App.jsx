import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import { useEffect } from "react";
import { getUsers } from "./api";

export default function App() {

  useEffect(() => {
    getUsers()
      .then(data => console.log("Users:", data))
      .catch(err => console.log("Error:", err));
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}