import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import PostRequest from './pages/PostRequest';
import RequestDetails from './pages/RequestDetails';
import Notifications from './pages/Notifications';
import Activity from './pages/Activity';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="post" element={<PostRequest />} />
          <Route path="request/:id" element={<RequestDetails />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="activity" element={<Activity />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
