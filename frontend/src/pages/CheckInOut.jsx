import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const CheckInOut = () => {

    const { user } = useAuth();

    const [passNumber, setPassNumber] = useState("");
    const [logs, setLogs] = useState([]);

    useEffect(() => {

        if (user.role === "admin") {

            fetchLogs();

        }

    }, []);

    const fetchLogs = async () => {

        try {

            const response = await api.get("/checklogs");

            setLogs(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const checkIn = async () => {

        if (!passNumber) {

            alert("Enter Pass Number");

            return;

        }

        try {

            const response = await api.post("/checklogs/checkin", {
                passNumber
            });

            alert(response.data.message);

            setPassNumber("");

        } catch (error) {

            alert(error.response?.data?.message || "Check In Failed");

        }

    };

    const checkOut = async () => {

        if (!passNumber) {

            alert("Enter Pass Number");

            return;

        }

        try {

            const response = await api.post("/checklogs/checkout", {
                passNumber
            });

            alert(response.data.message);

            setPassNumber("");

        } catch (error) {

            alert(error.response?.data?.message || "Check Out Failed");

        }

    };

    return (

        <DashboardLayout>

            <div className="page-header">

                <h1>Visitor Check In / Check Out</h1>

                <p>Manage visitor entry and exit records</p>

            </div>

            {user.role === "security" && (

                <div className="check-card">

                    <input
                        className="check-input"
                        type="text"
                        placeholder="Enter Pass Number"
                        value={passNumber}
                        onChange={(e) => setPassNumber(e.target.value)}
                    />

                    <div className="check-buttons">

                        <button
                            className="checkin-btn"
                            onClick={checkIn}
                        >
                            Check In
                        </button>

                        <button
                            className="checkout-btn"
                            onClick={checkOut}
                        >
                            Check Out
                        </button>

                    </div>

                </div>

            )}

            {user.role === "admin" && (

                <div className="table-container">

                    <table className="custom-table">

                        <thead>

                            <tr>

                                <th>Pass Number</th>
                                <th>Visitor</th>
                                <th>Host</th>
                                <th>Check In</th>
                                <th>Check Out</th>

                            </tr>

                        </thead>

                        <tbody>

                            {logs.length > 0 ? (

                                logs.map((log) => (

                                    <tr key={log._id}>

                                        <td>{log.pass?.passNumber}</td>

                                        <td>{log.pass?.appointment?.visitor?.name}</td>

                                        <td>{log.pass?.appointment?.host?.name}</td>

                                        <td>

                                            {log.checkIn
                                                ? new Date(log.checkIn).toLocaleString()
                                                : "-"}

                                        </td>

                                        <td>

                                            {log.checkOut
                                                ? new Date(log.checkOut).toLocaleString()
                                                : "-"}

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        style={{ textAlign: "center" }}
                                    >
                                        No Check Logs Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </DashboardLayout>

    );

};

export default CheckInOut;