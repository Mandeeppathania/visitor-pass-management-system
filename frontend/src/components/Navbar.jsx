import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();
        navigate("/");

    };

    return (

        <header className="navbar">

            <div className="navbar-title">

                <h2>Visitor Pass Management System</h2>

                <p>Secure Visitor & Pass Management</p>

            </div>

            <div className="navbar-right">

                <div className="user-info">

                    <span className="user-role">
                        {user.role.toUpperCase()}
                    </span>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </header>

    );

};

export default Navbar;