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

            switch (result.user.role) {
                case "admin":
                    navigate("/dashboard");
                    break;

                case "employee":
                    navigate("/dashboard");
                    break;

                case "security":
                    navigate("/dashboard");
                    break;

                default:
                    navigate("/");
            }
        } else {
            alert(result.message);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px",
            }}
        >
            <form onSubmit={handleSubmit}>

                <h2>Visitor Pass Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    );
};

export default LoginPage;