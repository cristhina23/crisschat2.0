import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  // Run authentication check when the app mounts
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  // Show loading spinner while checking authentication
  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin size-10' />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        {/*  Main page (protected) */}
        <Route
          path='/'
          element={authUser ? <HomePage /> : <Navigate to='/login' />}
        />

        {/*  Signup page (only when not logged in) */}
        <Route
          path='/signup'
          element={!authUser ? <SignupPage /> : <Navigate to='/' />}
        />

        {/*  Login page (only when not logged in) */}
        <Route
          path='/login'
          element={!authUser ? <LoginPage /> : <Navigate to='/' />}
        />

        {/*  Settings page (protected) */}
        <Route
          path='/settings'
          element={authUser ? <SettingsPage /> : <Navigate to='/login' />}
        />

        {/* Profile page (protected) */}
        <Route
          path='/profile'
          element={authUser ? <ProfilePage /> : <Navigate to='/login' />}
        />

        {/*  Redirect any unknown route to home */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
