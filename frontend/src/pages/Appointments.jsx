import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import Modal from "../components/Modal";
import AddAppointment from "../components/AddAppointment";

const Appointments = () => {
    const { user } = useAuth();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

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

            alert("Appointment Approved");

            fetchAppointments();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const rejectAppointment = async (id) => {

        try {

            await api.put(`/appointments/${id}/reject`, {
                remarks: "Rejected"
            });

            alert("Appointment Rejected");

            fetchAppointments();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };
    const generatePass = async (appointmentId) => {

    try {

        await api.post(`/passes/generate/${appointmentId}`);

        alert("Pass Generated Successfully");

        fetchAppointments();

    } catch (error) {

        alert(error.response?.data?.message || "Failed to generate pass");

    }

};

    return (

        <DashboardLayout>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <h1>Appointments</h1>

                {user.role === "admin" && (
    <button
        onClick={() => setOpen(true)}
    >
        + Request Appointment
    </button>
)}

            </div>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Request Appointment"
            >

                <AddAppointment
                    fetchAppointments={fetchAppointments}
                    onClose={() => setOpen(false)}
                />

            </Modal>

            {loading ? (

                <h2>Loading...</h2>

            ) : (

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >

                    <thead>

                        <tr>

                            <th>Visitor</th>
                            <th>Employee</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Purpose</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {appointments.map((appointment) => (

                            <tr key={appointment._id}>

                                <td>{appointment.visitor?.name}</td>

                                <td>{appointment.host?.name}</td>

                                <td>
                                    {new Date(
                                        appointment.visitDate
                                    ).toLocaleDateString()}
                                </td>

                                <td>{appointment.visitTime}</td>

                                <td>{appointment.purpose}</td>

                                <td>{appointment.status}</td>

                                <td>

                                    {appointment.status === "pending" && (
    <>
        <button
            onClick={() => approveAppointment(appointment._id)}
        >
            Approve
        </button>

        {" "}

        <button
            onClick={() => rejectAppointment(appointment._id)}
        >
            Reject
        </button>
    </>
)}

{appointment.status === "approved" && (
    <button
        onClick={() => generatePass(appointment._id)}
    >
        Generate Pass
    </button>
)}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </DashboardLayout>

    );

};

export default Appointments;