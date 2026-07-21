import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {

    return (

        <div
            style={{
                display: "flex",
                minHeight: "100vh"
            }}
        >

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    background: "#f5f5f5"
                }}
            >

                <Navbar />

                <div
                    style={{
                        padding: "30px"
                    }}
                >

                    {children}

                </div>

            </div>

        </div>

    );

};

export default DashboardLayout;