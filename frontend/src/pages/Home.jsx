import { Link } from "react-router-dom";

const Home = () => {

    return (

        <div className="home-page">

            <div className="home-overlay">

                <div className="home-content">

                    <h1>Visitor Pass Management System</h1>

                    <p>
                        Securely manage visitor appointments, passes,
                        check-ins and check-outs through one centralized
                        platform.
                    </p>

                    <div className="home-buttons">

                        <Link to="/request">

                            <button className="primary-btn">

                                Request Appointment

                            </button>

                        </Link>

                        <Link to="/login">

                            <button className="secondary-btn">

                                Employee / Admin Login

                            </button>

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Home;