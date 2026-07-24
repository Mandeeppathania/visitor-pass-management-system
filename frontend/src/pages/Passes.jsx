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

            <div className="page-header">

                <h1>Pass Management</h1>

                <p>View generated visitor passes</p>

            </div>

            {loading ? (

                <h2>Loading Passes...</h2>

            ) : (

                <div className="table-container">

                    <table className="custom-table">

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

                            {passes.length > 0 ? (

                                passes.map((pass) => (

                                    <tr key={pass._id}>

                                        <td>{pass.passNumber}</td>

                                        <td>{pass.appointment?.visitor?.name}</td>

                                        <td>{pass.appointment?.host?.name}</td>

                                        <td>

                                            <span className={`status ${pass.status}`}>

                                                {pass.status}

                                            </span>

                                        </td>

                                        <td>

                                            <img
                                                className="qr-image"
                                                src={`http://localhost:5000/${pass.qrCode}`}
                                                alt="QR Code"
                                            />

                                        </td>

                                        <td>

                                            <a
                                                className="download-btn"
                                                href={`http://localhost:5000/${pass.pdf}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Download PDF
                                            </a>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        No Passes Found
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

export default Passes;