import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const RequestAppointment = () => {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        host: "",
        visitDate: "",
        visitTime: "",
        purpose: ""
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await api.get("/users/employees");
            setEmployees(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post(
                "/appointments/request",
                form
            );

            alert(res.data.message);

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to submit appointment"
            );

        }

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px"
            }}
        >

            <form
                onSubmit={handleSubmit}
                style={{
                    width: "450px"
                }}
            >

                <h2>Visitor Appointment Request</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="host"
                    value={form.host}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Employee
                    </option>

                    {
                        employees.map(emp => (

                            <option
                                key={emp._id}
                                value={emp._id}
                            >
                                {emp.name} ({emp.department})
                            </option>

                        ))
                    }

                </select>

                <br /><br />

                <input
                    type="date"
                    name="visitDate"
                    value={form.visitDate}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="time"
                    name="visitTime"
                    value={form.visitTime}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="purpose"
                    placeholder="Purpose of Visit"
                    value={form.purpose}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Submit Request
                </button>

            </form>

        </div>

    );

};

export default RequestAppointment;