import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                gap: "20px"
            }}
        >
            <h1>Visitor Pass Management System</h1>

            <p>
                Welcome to our Visitor Pass Portal
            </p>

            <Link to="/request">
                <button>
                    Request Appointment
                </button>
            </Link>

            <Link to="/login">
                <button>
                    Employee / Admin Login
                </button>
            </Link>

        </div>
    );
};

export default Home;