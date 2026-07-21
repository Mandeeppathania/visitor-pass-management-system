import { useEffect, useState } from "react";
import api from "../services/api";

const AddAppointment = ({ fetchAppointments, onClose }) => {

    const [visitors, setVisitors] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        visitor: "",
        host: "",
        visitDate: "",
        visitTime: "",
        purpose: ""
    });

    useEffect(() => {

        loadVisitors();
        loadEmployees();

    }, []);

    const loadVisitors = async () => {

        try {

            const response = await api.get("/visitors");

            setVisitors(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const loadEmployees = async () => {

        try {

            const response = await api.get("/users/employees");

            setEmployees(response.data);

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

            await api.post("/appointments/request", form);

            alert("Appointment Requested Successfully");

            fetchAppointments();

            onClose();

        } catch (error) {

            alert(error.response?.data?.message || "Request Failed");

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

            <select
                name="visitor"
                value={form.visitor}
                onChange={handleChange}
                required
            >

                <option value="">Select Visitor</option>

                {visitors.map((visitor) => (

                    <option
                        key={visitor._id}
                        value={visitor._id}
                    >
                        {visitor.name}
                    </option>

                ))}

            </select>

            <select
                name="host"
                value={form.host}
                onChange={handleChange}
                required
            >

                <option value="">Select Employee</option>

                {employees.map((employee) => (

                    <option
                        key={employee._id}
                        value={employee._id}
                    >
                        {employee.name}
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
                value={form.purpose}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Request Appointment
            </button>

        </form>

    );

};

export default AddAppointment;