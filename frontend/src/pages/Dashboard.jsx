import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await api.get("/dashboard");

            setStats(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading Dashboard...</h2>;

    }

    return (

        <div style={{ padding: "30px" }}>

            <h1>Visitor Pass Management Dashboard</h1>

            <hr />

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >

                <Card
                    title="Total Visitors"
                    value={stats.totalVisitors}
                />

                <Card
                    title="Employees"
                    value={stats.totalEmployees}
                />

                <Card
                    title="Pending"
                    value={stats.pendingAppointments}
                />

                <Card
                    title="Approved"
                    value={stats.approvedAppointments}
                />

                <Card
                    title="Rejected"
                    value={stats.rejectedAppointments}
                />

                <Card
                    title="Active Passes"
                    value={stats.activePasses}
                />

                <Card
                    title="Expired Passes"
                    value={stats.expiredPasses}
                />

                <Card
                    title="Checked In"
                    value={stats.checkedInVisitors}
                />

            </div>

        </div>

    );

};

const Card = ({ title, value }) => {

    return (

        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
            }}
        >

            <h3>{title}</h3>

            <h1>{value}</h1>

        </div>

    );

};

export default Dashboard;