import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Appointments from "./pages/Appointments";
import Employees from "./pages/Employees";
import Passes from "./pages/Passes";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/visitors"
    element={
        <ProtectedRoute>
            <Visitors />
        </ProtectedRoute>
    }
/>
<Route
    path="/appointments"
    element={
        <ProtectedRoute>
            <Appointments />
        </ProtectedRoute>
    }
/>
<Route
    path="/employees"
    element={
        <ProtectedRoute>
            <Employees />
        </ProtectedRoute>
    }
/>
<Route
    path="/passes"
    element={
        <ProtectedRoute>
            <Passes />
        </ProtectedRoute>
    }
/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;