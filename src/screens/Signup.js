import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
    });
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);  // Track loading state

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

        setLoading(true);  // Set loading to true when submitting the form

        try {
            const response = await fetch('http://localhost:5000/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const json = await response.json();
            console.log(json);

            if (!response.ok) {
                alert('Error: ' + json.message);
            } else {
                alert('User created successfully!');
                setCredentials({ name: '', email: '', password: '', location: '' }); // Reset form fields
                setErrors([]); // Clear errors on successful submission
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);  // Reset loading state
        }
    };

    const validateForm = () => {
        const errors = [];

        if (!credentials.name || credentials.name.length < 5) {
            errors.push("Name must be at least 5 characters long.");
        }
        if (!credentials.email || !/\S+@\S+\.\S+/.test(credentials.email)) {
            errors.push("Invalid email.");
        }
        if (!credentials.password || credentials.password.length < 5) {
            errors.push("Password must be at least 5 characters long.");
        }
        if (!credentials.location) {
            errors.push("Address is required.");
        }

        return errors;
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text" 
                        className={`form-control ${errors.some(error => error.includes('Name')) ? 'is-invalid' : ''}`}
                        name="name"
                        value={credentials.name}
                        onChange={handleChange}
                    />
                    {errors.some(error => error.includes('Name')) && (
                        <div className="invalid-feedback">Name must be at least 5 characters long.</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.some(error => error.includes('Invalid email')) ? 'is-invalid' : ''}`}
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                    {errors.some(error => error.includes('Invalid email')) && (
                        <div className="invalid-feedback">Invalid email.</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.some(error => error.includes('Password')) ? 'is-invalid' : ''}`}
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    {errors.some(error => error.includes('Password')) && (
                        <div className="invalid-feedback">Password must be at least 5 characters long.</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Address</label>
                    <input
                        type="text"
                        className={`form-control ${errors.some(error => error.includes('Address')) ? 'is-invalid' : ''}`}
                        name="location"
                        value={credentials.location}
                        onChange={handleChange}
                    />
                    {errors.some(error => error.includes('Address')) && (
                        <div className="invalid-feedback">Address is required.</div>
                    )}
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

                <button type="submit" className="m-3 btn btn-success" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>

                <Link to="/login" className="m-3 btn btn-danger">
                    Already a user?
                </Link>
            </form>
        </div>
    );
}
