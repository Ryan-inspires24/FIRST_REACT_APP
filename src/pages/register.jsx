import React, { useState } from "react";
import axios from "axios";
import "../auth.css";
import DefaultPage from "../DefaultPage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: "",
        username: "",
        email: "",
        password: "",
        role: "vendor",
        phone_number: 123456789,
    });

    const [profilePicture, setProfilePicture] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);  // New state for uploaded image URL


    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setUploadedImageUrl(null);
        if (!formData.username || !formData.email || !formData.password) {
            setError("Please fill in all required fields.");
            return;
        }
        try {
            const data = new FormData();
            data.append("user_type", formData.role);
            data.append("description", formData.description);
            data.append("register_username", formData.username);
            data.append("email", formData.email);
            data.append("register_password", formData.password);
            data.append("phone_number", formData.phone_number);
            if (profilePicture) {
                data.append("profile_picture", profilePicture);
            }

            const response = await axios.post(
                "https://ryaninspires.pythonanywhere.com/api/register",
                data,
                            );

            setMessage(response.data.message || "Registration successful!");
            if (response.data.profile_picture_url) {
                setUploadedImageUrl(response.data.profile_picture_url);
            }

            setTimeout(() => {
                navigate("/users");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    };
    const [usernameStatus, setUsernameStatus] = useState(null);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (formData.username.length > 2) {
                checkUsernameAvailability();
            }
        }, 500); // Wait 500ms after typing

        return () => clearTimeout(delayDebounce);
    }, [formData.username, formData.role]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const checkUsernameAvailability = async () => {
        try {
            const res = await axios.get("https://RyanInspires.pythonanywhere.com/api/check_username", {
                params: {
                    username: formData.username,
                    role: formData.role,
                },
            });
            setUsernameStatus(res.data.available ? "available" : "taken");
        } catch (err) {
            setUsernameStatus("error");
        }
    };
    return (
        <DefaultPage>
            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <div className="auth-header">
                        <h2>Create an Account</h2>
                        <p>Please fill in the details below to register.</p>
                    </div>

                    <div className="auth-form">
                        <p><label>Profile Picture</label></p>
                        <input
                            type="file"
                            name="profilePicture"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        {uploadedImageUrl && (
                            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                                <p>Uploaded Profile Picture Preview:</p>
                                <img src={uploadedImageUrl} alt="Profile Preview" width="150" />
                            </div>
                        )}
                    </div>

                    <div className="auth-form">
                        <p><label>Username</label></p>
                        <p><input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required /></p>
                        {usernameStatus === "available" && (
                            <p><small style={{ color: "green" }}>Username is available</small></p>
                        )}
                        {usernameStatus === "taken" && (
                            <p><small style={{ color: "red" }}>Username already taken</small></p>
                        )}
                        {usernameStatus === "error" && (
                            <p><small style={{ color: "orange" }}>Error checking username</small></p>
                        )}
                    </div>

                    <div className="auth-form">
                        <p><label>Description</label></p>
                        <p><textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        /></p>
                    </div>

                    <div className="auth-form">
                        <p><label>Email</label></p>
                        <p><input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        /></p>
                    </div>

                    <div className="auth-form">
                        <p><label>Password</label></p>
                        <p><input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        /></p>
                    </div>
                    <div className="auth-form"><NavLink to="/login">Already have an account? Login here</NavLink></div>
                    <button type="submit" className="auth-button">Register</button>

                    {message && <p style={{ color: "green" }}>{message}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </DefaultPage>
    );
}

export default Register;
