import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState([]); // Store validation errors
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    let navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true); // Start loading
        setErrors([]); // Clear previous errors before submitting

        try {
            console.log("Submitting login request with credentials:", credentials); // Log credentials for debugging
            const response = await fetch("http://localhost:5000/api/loginuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();
            console.log("Response from server:", json); // Log server response for debugging

            if (!response.ok) {
                // Handle error from response
                setErrors([json.error || json.message || "Something went wrong. Try again."]);
            } else {
                if (json.success) {
                    alert("Login successful!");
                    localStorage.setItem("authToken", json.token); // Store the JWT securely
                    setIsLoggedIn(true); // Update login state
                    setCredentials({ email: "", password: "" }); // Clear form on success
                    navigate("/"); // Navigate to home page after successful login
                } else {
                    setErrors([json.message || "Something went wrong."]);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setErrors(["Something went wrong. Please try again."]);
        }

        setIsLoading(false); // Stop loading
    };

    const validateForm = () => {
        const errors = [];
        if (!credentials.email || !/\S+@\S+\.\S+/.test(credentials.email)) {
            errors.push("Invalid email.");
        }
        if (!credentials.password || credentials.password.length < 5) {
            errors.push("Password must be at least 5 characters long.");
        }
        return errors;
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button type="submit" className="m-3 btn btn-success" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                <Link to="/signup" className="m-3 btn btn-primary" aria-label="Sign up for a new account">
                    New user? Sign up
                </Link>
            </form>
        </div>
    );
}
