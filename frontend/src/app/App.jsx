import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../shared/Routes/ProtectedRoute.jsx";
import Authentication from "../pages/authentication/Authentication.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
