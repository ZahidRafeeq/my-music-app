import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import LoadingPage from "./pages/Loading";
import Discover from "./pages/Discover";
import WeeklyTopSongs from "./components/WeeklyTopSongs";
import Music from "./pages/Music";
import Album from "./pages/Album";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  // First-time app load
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData?.isAuthenticated) {
      setIsAuthenticated(true);
      setUser(authData.user);
    }
    setInitialLoading(false);
  }, []);
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [location]);

  const handleLogin = (userData) => {
    setInitialLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, user: userData }));
      setInitialLoading(false);
    }, 1000);
  };

  const handleSignup = (userData) => {
    setInitialLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem("auth", JSON.stringify({ isAuthenticated: true, user: userData }));
      setInitialLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
    setUser(null);
  };

  if (initialLoading || pageLoading) return <LoadingPage />;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <HomePage user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/discover"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Discover user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/weekly-songs"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <WeeklyTopSongs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/albums"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Album user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/music/:id"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Music />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/" /> : <SignUpPage onSignup={handleSignup} />
        }
      />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
    </Routes>
  );
};

export default App;
