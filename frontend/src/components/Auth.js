import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ type }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        role: "Student",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const endpoint = type === "register" ? "/register" : "/login";
    //     try {
    //         const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, form);
    //         console.log("API Response:", response); // Debugging log
    //         if (response.data) {
    //             alert(response.data.message);
    //             if (type === "login") {
    //                 localStorage.setItem("token", response.data.token);
    //                 navigate("/dashboard");
    //             } else {
    //                 navigate("/login");
    //             }
    //         } else {
    //             throw new Error("No response data received");
    //         }
    //     } catch (error) {
    //         console.error("Error during authentication:", error);
    //         alert(error.response?.data?.message || "An error occurred. Please try again.");
    //     }


    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = type === "register" ? "/register" : "/login";
            const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, form);

            alert(response.data.message);
            if (type === "login") {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify({
                    id: response.data.user.id,  // Ensure ID is stored correctly
                    name: response.data.user.name,
                    email: response.data.user.email,
                    role: response.data.user.role,
                    profilePicture: response.data.user.profilePicture || "",
                }));

                //  navigate("/dashboard");

                switch (response.data.user.role) {
                    case "Admin":
                    case "System Admin":
                    case "Instructor":
                    case "Student":
                        navigate("/dashboard"); // ✅ Let Layout.js handle dashboards
                        break;
                    default:
                        navigate("/");
                }
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };




    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h3 className="text-center mb-3">{type === "register" ? "Register" : "Login"}</h3>
                <form onSubmit={handleSubmit}>
                    {type === "register" && (
                        <div className="mb-3">
                            <input type="text" name="name" className="form-control" placeholder="Full Name" onChange={handleChange} required />
                        </div>
                    )}
                    <div className="mb-3">
                        <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} required />
                    </div>
                    {type === "register" && (
                        <div className="mb-3">
                            <select name="role" className="form-select" onChange={handleChange}>
                                {["System Admin", "Admin", "Instructor", "Student", "Parent", "Principal", "Reports Viewer"].map((role) => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {type === "register" && (
                        <div className="mb-3">
                            <input type="text" name="mobile" className="form-control" placeholder="Mobile" onChange={handleChange} required />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100">
                        {type === "register" ? "Register" : "Login"}
                    </button>
                </form>
                <div className="text-center mt-3">
                    {type === "register" ? (
                        <p>Already have an account? <a href="/login">Login</a></p>
                    ) : (
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
