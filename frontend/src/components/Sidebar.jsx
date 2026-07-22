import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

    const { user } = useAuth();

    return (

        <div
            style={{
                width: "240px",
                background: "#1e293b",
                color: "white",
                minHeight: "100vh",
                padding: "20px",
                boxSizing: "border-box"
            }}
        >

            <h2>Visitor Pass</h2>

            <hr />

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "20px"
                }}
            >

                <Link
                    to="/dashboard"
                    style={linkStyle}
                >
                    Dashboard
                </Link>

                {/* ADMIN */}

                {user.role === "admin" && (
                    <>
                        <Link
                            to="/appointments"
                            style={linkStyle}
                        >
                            Appointments
                        </Link>

                        <Link
                            to="/employees"
                            style={linkStyle}
                        >
                            Employees
                        </Link>

                        <Link
                            to="/passes"
                            style={linkStyle}
                        >
                            Passes
                        </Link>

                        <Link
                            to="/checklogs"
                            style={linkStyle}
                        >
                            Check Logs
                        </Link>
                    </>
                )}

                {/* EMPLOYEE */}

                {user.role === "employee" && (
                    <>
                        <Link
                            to="/appointments"
                            style={linkStyle}
                        >
                            Appointments
                        </Link>

                        <Link
                            to="/passes"
                            style={linkStyle}
                        >
                            Passes
                        </Link>
                    </>
                )}

                {/* SECURITY */}

                {user.role === "security" && (
                    <>
                        <Link
                            to="/passes"
                            style={linkStyle}
                        >
                            Passes
                        </Link>

                        <Link
                            to="/checklogs"
                            style={linkStyle}
                        >
                            Check In / Out
                        </Link>
                    </>
                )}

            </nav>

        </div>

    );

};

const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "18px"
};

export default Sidebar;