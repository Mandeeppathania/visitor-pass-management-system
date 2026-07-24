import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

    const { user } = useAuth();
    const location = useLocation();

    const active = (path) =>
        location.pathname === path ? "sidebar-link active" : "sidebar-link";

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <h2>Visitor Pass</h2>
                <p>Management System</p>

            </div>

            <nav className="sidebar-nav">

                <Link to="/dashboard" className={active("/dashboard")}>
                    Dashboard
                </Link>

                {user.role === "admin" && (
                    <>
                        <Link to="/appointments" className={active("/appointments")}>
                            Appointments
                        </Link>

                        <Link to="/employees" className={active("/employees")}>
                            Employees
                        </Link>

                        <Link to="/passes" className={active("/passes")}>
                            Passes
                        </Link>

                        <Link to="/checklogs" className={active("/checklogs")}>
                            Check Logs
                        </Link>
                    </>
                )}

                {user.role === "employee" && (
                    <>
                        <Link to="/appointments" className={active("/appointments")}>
                            Appointments
                        </Link>

                        <Link to="/passes" className={active("/passes")}>
                            Passes
                        </Link>
                    </>
                )}

                {user.role === "security" && (
                    <>
                        <Link to="/passes" className={active("/passes")}>
                            Passes
                        </Link>

                        <Link to="/checklogs" className={active("/checklogs")}>
                            Check In / Out
                        </Link>
                    </>
                )}

            </nav>

        </aside>

    );

};

export default Sidebar;