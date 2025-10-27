import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../shared/Routes/ProtectedRoute.jsx";
import Authentication from "../pages/Authentication.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import CreationMenu from "../features/dashboard/components/AddTab/CreationMenu.jsx";

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
        <Route
          path="/addMenu"
          element={
            <ProtectedRoute>
              <CreationMenu />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
