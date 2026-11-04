import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Initialize theme before render
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

function App() {
  return (
    <BrowserRouter>

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      <Routes>
        {/* Public portfolio */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <AnimatePresence mode="wait">
                <Home />
              </AnimatePresence>
            </>
          }
        />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
