import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

const Visitors = () => {

    const [visitors, setVisitors] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchVisitors();

    }, []);

    const fetchVisitors = async () => {

        try {

            const response = await api.get("/visitors");

            setVisitors(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout>

            <h1>Visitors</h1>

            {loading ? (

                <h3>Loading...</h3>

            ) : (

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        marginTop: "20px",
                        width: "100%"
                    }}
                >

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Company</th>

                        </tr>

                    </thead>

                    <tbody>

                        {visitors.map((visitor) => (

                            <tr key={visitor._id}>

                                <td>{visitor.name}</td>

                                <td>{visitor.email}</td>

                                <td>{visitor.phone}</td>

                                <td>{visitor.company}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </DashboardLayout>

    );

};

export default Visitors;