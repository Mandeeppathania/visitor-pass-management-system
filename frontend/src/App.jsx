import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RequestAppointment from "./pages/RequestAppointment";

import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Appointments from "./pages/Appointments";
import Employees from "./pages/Employees";
import Passes from "./pages/Passes";
import CheckInOut from "./pages/CheckInOut";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/request"
                    element={<RequestAppointment />}
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

                <Route
                    path="/checklogs"
                    element={
                        <ProtectedRoute>
                            <CheckInOut />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;