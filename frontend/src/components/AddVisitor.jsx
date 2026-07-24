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
            className="visitor-form"
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={form.company}
                onChange={handleChange}
                required
            />

            <button
                className="primary-btn"
                type="submit"
            >
                {visitor ? "Update Visitor" : "Add Visitor"}
            </button>

        </form>

    );

};

export default AddVisitor;
