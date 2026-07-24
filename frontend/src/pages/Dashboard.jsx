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

                <div className="loading-container">
                    <h2>Loading Dashboard...</h2>
                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="dashboard-header">

                <h1>Dashboard</h1>

                <p>Visitor Pass Management System Overview</p>

            </div>

            <div className="dashboard-grid">

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

        <div className="dashboard-card">

            <h3>{title}</h3>

            <h2>{value ?? 0}</h2>

        </div>

    );

};

export default Dashboard;