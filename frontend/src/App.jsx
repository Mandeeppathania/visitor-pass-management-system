import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";

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

            </Routes>
        </BrowserRouter>
    );
}

export default App;