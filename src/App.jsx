import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mockDatabaseService } from './services/mockDatabase';
import { setUser, setAnalytics } from './store/slices/userSlice';
import { setAuth } from './store/slices/authSlice';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import PublicResume from './pages/PublicResume';
import Analytics from './pages/Analytics';
import AIAssistantPage from './pages/AIAssistantPage';
import SettingsPage from './pages/Settings';
import AuthPage from './pages/AuthPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    mockDatabaseService.init();
    
    // Check for existing session
    const currentUser = mockDatabaseService.getCurrentUser();
    if (currentUser) {
      dispatch(setAuth(currentUser));
      // Sync legacy user slice for now if needed, though we should move to auth.user
      dispatch(setUser(currentUser));
    } else {
      dispatch(setAuth(null));
    }

    const data = mockDatabaseService.getData();
    if (data.analytics) {
      dispatch(setAnalytics(data.analytics));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/auth" element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" replace />} />
      
      <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="editor/:id?" element={<Editor />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="ai-assistant" element={<AIAssistantPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      <Route path="/share/:id" element={<PublicResume />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
