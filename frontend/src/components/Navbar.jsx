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

        <div
            style={{
                height: "70px",
                background: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                borderBottom: "1px solid #ddd"
            }}
        >

            <h3>Visitor Pass Management System</h3>

            <div>

                <span
                    style={{
                        marginRight: "20px"
                    }}
                >
                    {user.role.toUpperCase()}
                </span>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </div>

    );

};

export default Navbar;