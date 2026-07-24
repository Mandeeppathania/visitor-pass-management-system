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

            <div className="page-header visitor-header">

                <div>

                    <h1>Visitors</h1>
                    <p>Manage all registered visitors</p>

                </div>

                <button
                    className="primary-btn"
                    onClick={openAddModal}
                >
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

                <h2>Loading Visitors...</h2>

            ) : (

                <div className="table-container">

                    <table className="custom-table">

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

                            {visitors.length > 0 ? (

                                visitors.map((visitor) => (

                                    <tr key={visitor._id}>

                                        <td>{visitor.name}</td>

                                        <td>{visitor.email}</td>

                                        <td>{visitor.phone}</td>

                                        <td>{visitor.company}</td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        openEditModal(visitor)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteVisitor(visitor._id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        style={{ textAlign: "center" }}
                                    >
                                        No Visitors Found
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

export default Visitors;