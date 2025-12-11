import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm({ onSwitch }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();

    async function sign_up(e) {
        e.preventDefault();
        if(password !== repeatPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, repeat_password: repeatPassword })
            });

            if(response.ok) {
                navigate("/translate");
            } else {
                const errorData = await response.json();
                if (Array.isArray(errorData.detail)) {
                    alert("Error: " + errorData.detail[0].msg);
                } else {
                    alert("Error: " + errorData.detail);
                }
            }
        } catch (error) {
            console.error("Error fetching:", error);
        }
    }

    return (
        <div className="sign-up">
            <h1>Sign Up</h1>
            <form onSubmit={sign_up}>
                <label htmlFor="sign-user">Username:</label><br/>
                <input
                    type="text"
                    id="sign-user"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br/>
                <label htmlFor="sign-pass">Password:</label><br/>
                <input
                    type="password"
                    id="sign-pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br/>
                <label htmlFor="sign-rpass">Repeat Password:</label><br/>
                <input
                    type="password"
                    id="sign-rpass"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                /><br/>
                <button type="submit">Sign in</button>
            </form>
            <div>
                <p>Already have account?</p>
                <span onClick={onSwitch} style={{ cursor: "pointer" }}>
                    Log in
                </span>
            </div>
        </div>
    );
}

export default SignUpForm;