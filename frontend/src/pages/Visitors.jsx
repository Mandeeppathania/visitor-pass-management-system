import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

import AddVisitor from "../components/AddVisitor";
import Modal from "../components/Modal";

const Visitors = () => {

    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);

    const [selectedVisitor, setSelectedVisitor] = useState(null);

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

    const deleteVisitor = async (id) => {

        if (!window.confirm("Delete this visitor?")) return;

        try {

            await api.delete(`/visitors/${id}`);

            fetchVisitors();

        } catch (error) {

            alert(error.response?.data?.message);

        }

    };

    const openAddModal = () => {

        setSelectedVisitor(null);

        setOpen(true);

    };

    const openEditModal = (visitor) => {

        setSelectedVisitor(visitor);

        setOpen(true);

    };

    return (

        <DashboardLayout>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                }}
            >

                <h1>Visitors</h1>

                <button onClick={openAddModal}>

                    + Add Visitor

                </button>

            </div>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title={
                    selectedVisitor
                        ? "Edit Visitor"
                        : "Add Visitor"
                }
            >

                <AddVisitor

                    visitor={selectedVisitor}

                    fetchVisitors={fetchVisitors}

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

                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {visitors.map((visitor) => (

                            <tr key={visitor._id}>

                                <td>{visitor.name}</td>

                                <td>{visitor.email}</td>

                                <td>{visitor.phone}</td>

                                <td>{visitor.company}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            openEditModal(visitor)
                                        }
                                    >
                                        Edit
                                    </button>

                                    {" "}

                                    <button
                                        onClick={() =>
                                            deleteVisitor(visitor._id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </DashboardLayout>

    );

};

export default Visitors;