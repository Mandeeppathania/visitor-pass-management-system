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

                <Link style={linkStyle} to="/dashboard">
                    Dashboard
                </Link>

                {(user.role === "admin" || user.role === "employee") && (
                    <>
                        <Link style={linkStyle} to="/visitors">
                            Visitors
                        </Link>

                        <Link style={linkStyle} to="/appointments">
                            Appointments
                        </Link>

                        
                        <Link to="/passes">Passes</Link>
                        <Link to="/checklogs">
    Check In / Out
</Link>
                    </>
                )}

                {(user.role === "security") && (
                    <Link style={linkStyle} to="/checkin">
                        Check In / Out
                    </Link>
                )}
                {
    user.role === "admin" && (
        <Link to="/employees">Employees</Link>
    )
}

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