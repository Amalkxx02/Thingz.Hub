import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from './pages/auth/Auth.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';



function App() {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default App
