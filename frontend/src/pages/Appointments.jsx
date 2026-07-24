import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Appointments = () => {

    const { user } = useAuth();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {

        try {

            const response = await api.get("/appointments");
            setAppointments(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const approveAppointment = async (id) => {

        try {

            await api.put(`/appointments/${id}/approve`);
            await api.post(`/passes/generate/${id}`);

            alert("Appointment Approved Successfully");

            fetchAppointments();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const rejectAppointment = async (id) => {

        try {

            await api.put(`/appointments/${id}/reject`);

            alert("Appointment Rejected");

            fetchAppointments();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    if (loading) {

        return (

            <DashboardLayout>

                <h2>Loading Appointments...</h2>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="page-header">

                <h1>Appointments</h1>

                <p>Manage visitor appointments</p>

            </div>

            <div className="table-container">

                <table className="custom-table">

                    <thead>

                        <tr>

                            <th>Visitor</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Purpose</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {appointments.map((appointment) => (

                            <tr key={appointment._id}>

                                <td>{appointment.visitor?.name}</td>

                                <td>{appointment.visitor?.email}</td>

                                <td>{appointment.visitor?.phone}</td>

                                <td>{appointment.host?.name}</td>

                                <td>{new Date(appointment.visitDate).toLocaleDateString()}</td>

                                <td>{appointment.visitTime}</td>

                                <td>{appointment.purpose}</td>

                                <td>

                                    <span className={`status ${appointment.status}`}>

                                        {appointment.status}

                                    </span>

                                </td>

                                <td>

                                    {appointment.status === "pending" &&
                                        (user.role === "employee" ||
                                            user.role === "admin") ? (

                                        <div className="action-buttons">

                                            <button
                                                className="approve-btn"
                                                onClick={() =>
                                                    approveAppointment(appointment._id)
                                                }
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="reject-btn"
                                                onClick={() =>
                                                    rejectAppointment(appointment._id)
                                                }
                                            >
                                                Reject
                                            </button>

                                        </div>

                                    ) : (

                                        <span>-</span>

                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

};

export default Appointments;