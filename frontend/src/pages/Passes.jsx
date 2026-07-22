import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

const Passes = () => {

    const [passes, setPasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchPasses();

    }, []);

    const fetchPasses = async () => {

        try {

            const response = await api.get("/passes");

            setPasses(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <h1>Pass Management</h1>

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

                            <th>Pass No.</th>
                            <th>Visitor</th>
                            <th>Employee</th>
                            <th>Status</th>
                            <th>QR Code</th>
                            <th>PDF</th>

                        </tr>

                    </thead>

                    <tbody>

                        {passes.map((pass) => (

                            <tr key={pass._id}>

                                <td>

                                    {pass.passNumber}

                                </td>

                                <td>

                                    {pass.appointment?.visitor?.name}

                                </td>

                                <td>

                                    {pass.appointment?.host?.name}

                                </td>

                                <td>

                                    {pass.status}

                                </td>

                                <td>

                                    <img

                                        src={`http://localhost:5000/${pass.qrCode}`}

                                        alt="QR"

                                        width="80"

                                    />

                                </td>

                                <td>

                                    <a

                                        href={`http://localhost:5000/${pass.pdf}`}

                                        target="_blank"

                                        rel="noreferrer"

                                    >

                                        Download

                                    </a>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </DashboardLayout>

    );

};

export default Passes;