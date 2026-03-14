import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { mockDatabaseService } from './services/mockDatabase';
import { setUser, setAnalytics } from './store/slices/userSlice';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize DB and load user data
    mockDatabaseService.init();
    const data = mockDatabaseService.getData();
    dispatch(setUser(data.user));
    dispatch(setAnalytics(data.analytics));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="editor/:id?" element={<Editor />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
