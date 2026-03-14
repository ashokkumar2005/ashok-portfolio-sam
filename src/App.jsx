import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider }    from './context/AuthContext';
import ProtectedRoute      from './components/ProtectedRoute';
import Home                from './pages/Home';
import Login               from './components/Login';
import AdminDashboard      from './components/admin/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"       element={<Home />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/admin"  element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
