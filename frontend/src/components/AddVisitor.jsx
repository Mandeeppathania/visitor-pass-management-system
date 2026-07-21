import { useState } from "react";
import api from "../services/api";

const AddVisitor = ({ fetchVisitors }) => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/visitors", form);

            alert("Visitor Added Successfully");

            setForm({
                name: "",
                email: "",
                phone: "",
                company: ""
            });

            fetchVisitors();

        } catch (error) {

            alert(error.response?.data?.message || "Error");

        }

    };

    return (

        <form
            onSubmit={handleSubmit}
            style={{
                marginBottom: "30px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap"
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
                Add Visitor
            </button>

        </form>

    );

};

export default AddVisitor;