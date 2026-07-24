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

        <div className="request-page">

            <div className="request-card">

                <h1>Appointment Request</h1>

                <p>
                    Fill in your details to request an appointment with an employee.
                </p>

                <form
                    className="request-form"
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
                        placeholder="Company"
                        value={form.company}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="host"
                        value={form.host}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {employees.map((emp) => (

                            <option
                                key={emp._id}
                                value={emp._id}
                            >
                                {emp.name} ({emp.department})
                            </option>

                        ))}

                    </select>

                    <input
                        type="date"
                        name="visitDate"
                        value={form.visitDate}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="time"
                        name="visitTime"
                        value={form.visitTime}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="purpose"
                        placeholder="Purpose of Visit"
                        rows="4"
                        value={form.purpose}
                        onChange={handleChange}
                        required
                    />

                    <button
                        className="primary-btn"
                        type="submit"
                    >
                        Submit Request
                    </button>

                </form>

            </div>

        </div>

    );

};

export default RequestAppointment;
