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

            <h1>Visitor Check In / Check Out</h1>

            {user.role === "security" && (

                <div
                    style={{
                        maxWidth: "500px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        marginBottom: "40px"
                    }}
                >

                    <input
                        type="text"
                        placeholder="Enter Pass Number"
                        value={passNumber}
                        onChange={(e) => setPassNumber(e.target.value)}
                    />

                    <button onClick={checkIn}>
                        Check In
                    </button>

                    <button onClick={checkOut}>
                        Check Out
                    </button>

                </div>

            )}

            {user.role === "admin" && (

                <>

                    <h2>Check Logs</h2>

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

                                        <td>

                                            {log.pass?.passNumber}

                                        </td>

                                        <td>

                                            {log.pass?.appointment?.visitor?.name}

                                        </td>

                                        <td>

                                            {log.pass?.appointment?.host?.name}

                                        </td>

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
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        No Check Logs Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </>

            )}

        </DashboardLayout>

    );

};

export default CheckInOut;