import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onSwitch }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function log_in(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/log-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if(response.ok) {
                const data = await response.json();
                console.log("Log in Success!");
                localStorage.setItem("token", data.token)
                localStorage.setItem("id", data.id)
                navigate("/translate");
            } else {
                const errorData = await response.json();
                alert("Error: " + errorData.detail);
            }
        } catch (error) {
            console.error("Error fetching:", error);
        }
    }

    return (
        <div className="log-in">
            <h1>Log in</h1>
            <form onSubmit={log_in}>
                <label htmlFor="login-user">Username:</label><br/>
                <input
                    type="text"
                    id="login-user"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br/>
                <label htmlFor="login-pass">Password:</label><br/>
                <input
                    type="password"
                    id="login-pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br/>
                <button type="submit">Log in</button>
            </form>

            <div style={{marginTop: "10px"}}>
                <p>Don't have an account?</p>
                <span onClick={onSwitch} style={{ cursor: "pointer" }}>
                    Sign Up
                </span>
            </div>
        </div>
    );
}

export default LoginForm;