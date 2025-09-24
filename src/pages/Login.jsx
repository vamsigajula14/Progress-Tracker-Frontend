import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function signIn(event) {
        event.preventDefault();

        if (email.trim().length === 0) {
            alert("Email is empty");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            const user = { email: email.trim(), password };
            const res = await axios.post(
                "https://progress-tracker-backend-hyf8.onrender.com/api/auth/login",
                user
            );

            // Adjust based on your backend response structure
            const token = res.data.token || res.data.user?.token;
            if (token) {
                localStorage.setItem("token", token);
                navigate("/dashboard");
            } else {
                alert("No token received from server");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={signIn}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

