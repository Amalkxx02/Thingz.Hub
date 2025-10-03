import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
