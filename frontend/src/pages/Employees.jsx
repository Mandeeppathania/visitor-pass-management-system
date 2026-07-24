import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

const Employees = () => {

    const [users, setUsers] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "employee",
        phone: "",
        department: ""
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const response = await api.get("/users");
            setUsers(response.data);

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

            await api.post("/users/create", form);

            alert("User Created Successfully");

            setForm({
                name: "",
                email: "",
                password: "",
                role: "employee",
                phone: "",
                department: ""
            });

            fetchUsers();

        } catch (error) {

            alert(error.response?.data?.message || "Something went wrong");

        }

    };

    return (

        <DashboardLayout>

            <div className="page-header">
                <h1>Employee Management</h1>
                <p>Create and manage employees & security staff</p>
            </div>

            <div className="employee-form-card">

                <form className="employee-form" onSubmit={handleSubmit}>

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
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="employee">Employee</option>
                        <option value="security">Security</option>
                    </select>

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
                        name="department"
                        placeholder="Department"
                        value={form.department}
                        onChange={handleChange}
                        required
                    />

                    <button className="primary-btn" type="submit">
                        Create User
                    </button>

                </form>

            </div>

            <div className="table-container">

                <table className="custom-table">

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Phone</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.length > 0 ? (

                            users.map((user) => (

                                <tr key={user._id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>

                                        <span className={`role-badge ${user.role}`}>

                                            {user.role}

                                        </span>

                                    </td>

                                    <td>{user.department}</td>

                                    <td>{user.phone}</td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    No Users Found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

};

export default Employees;