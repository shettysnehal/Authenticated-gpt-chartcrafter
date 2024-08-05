// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AiComponent from './components/Aicomponent'
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={
        <ProtectedRoute>
          <AiComponent />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
