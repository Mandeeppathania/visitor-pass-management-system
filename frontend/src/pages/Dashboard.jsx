import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {

    const [stats, setStats] = useState({});
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

        return (
            <DashboardLayout>
                <h2>Loading...</h2>
            </DashboardLayout>
        );

    }

    return (

        <DashboardLayout>

            <h1>Dashboard</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >

                <Card title="Visitors" value={stats.totalVisitors} />
                <Card title="Employees" value={stats.totalEmployees} />
                <Card title="Pending" value={stats.pendingAppointments} />
                <Card title="Approved" value={stats.approvedAppointments} />
                <Card title="Rejected" value={stats.rejectedAppointments} />
                <Card title="Active Passes" value={stats.activePasses} />
                <Card title="Expired Passes" value={stats.expiredPasses} />
                <Card title="Checked In" value={stats.checkedInVisitors} />

            </div>

        </DashboardLayout>

    );

};

const Card = ({ title, value }) => {

    return (

        <div
            style={{
                background: "white",
                borderRadius: "10px",
                padding: "25px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
            }}
        >

            <h3>{title}</h3>

            <h1>{value}</h1>

        </div>

    );

};

export default Dashboard;