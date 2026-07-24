import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const result = await login(form.email, form.password);

        if (result.success) {

            alert("Login Successful");

            navigate("/dashboard");

        } else {

            alert(result.message);

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>Visitor Pass</h1>

                <p>Management System</p>

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
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

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

};

export default LoginPage;