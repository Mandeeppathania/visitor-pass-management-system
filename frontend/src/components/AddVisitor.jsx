import { useEffect, useState } from "react";
import api from "../services/api";

const AddVisitor = ({ fetchVisitors, onClose, visitor }) => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: ""
    });

    useEffect(() => {

        if (visitor) {

            setForm({
                name: visitor.name,
                email: visitor.email,
                phone: visitor.phone,
                company: visitor.company
            });

        }

    }, [visitor]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (visitor) {

                await api.put(`/visitors/${visitor._id}`, form);

                alert("Visitor Updated Successfully");

            } else {

                await api.post("/visitors/register", form);

                alert("Visitor Added Successfully");

            }

            setForm({
                name: "",
                email: "",
                phone: "",
                company: ""
            });

            fetchVisitors();

            onClose();

        } catch (error) {

            alert(error.response?.data?.message || "Operation Failed");

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}
        >

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
            />

            <input
                type="text"
                name="company"
                placeholder="Company"
                value={form.company}
                onChange={handleChange}
            />

            <button type="submit">

                {visitor ? "Update Visitor" : "Add Visitor"}

            </button>

        </form>

    );

};

export default AddVisitor;