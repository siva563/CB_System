import React, { useState } from "react";
import axios from "axios";

const AddAssignment = () => {
    const [assignment, setAssignment] = useState({
        title: "",
        dueDate: "",
        totalMarks: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setAssignment({ ...assignment, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/assignments/create", assignment, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setMessage(response.data.message);
            setAssignment({ title: "", dueDate: "", totalMarks: "" });
        } catch (error) {
            setMessage(error.response?.data?.message || "Error creating assignment");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create New Assignment</h2>
            {message && <p className="alert alert-info">{message}</p>}

            <form onSubmit={handleSubmit} className="card p-4">
                <div className="mb-3">
                    <label className="form-label">Assignment Title</label>
                    <input type="text" name="title" className="form-control" value={assignment.title} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input type="date" name="dueDate" className="form-control" value={assignment.dueDate} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Total Marks</label>
                    <input type="number" name="totalMarks" className="form-control" value={assignment.totalMarks} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary">Create Assignment</button>
            </form>
        </div>
    );
};

export default AddAssignment;
