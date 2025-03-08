// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ManageUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [batches, setBatches] = useState([]);
//     const [showInstructors, setShowInstructors] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const [message, setMessage] = useState("");

//     const [newUser, setNewUser] = useState({
//         name: "",
//         email: "",
//         password: "",
//         mobile: "",
//         role: "Student",
//         batchId: "",
//     });

//     useEffect(() => {
//         fetchUsers();
//         fetchBatches();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/admin/users", {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             console.log("Fetched Users:", response.data); // ✅ Debugging log
//             setUsers(response.data);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };

//     const fetchBatches = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/api/batches");
//             console.log("Fetched Batches:", response.data); // ✅ Debugging log
//             const today = new Date().toISOString().split("T")[0];
//             const activeBatches = response.data.filter(batch => batch.endDate >= today);
//             setBatches(activeBatches);
//         } catch (error) {
//             console.error("Error fetching batches:", error);
//         }
//     };

//     const students = users.filter(user => user.role === "Student");
//     const instructors = users.filter(user => user.role === "Instructor");

//     const handleChange = (e) => {
//         setNewUser({ ...newUser, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://localhost:5000/api/admin/users", newUser, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             setMessage("User added successfully!");
//             setNewUser({ name: "", email: "", password: "", mobile: "", role: "Student", batchId: "" });
//             setShowForm(false);
//             fetchUsers();
//         } catch (error) {
//             setMessage("Error adding user");
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this user?")) return;
//         try {
//             await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             setMessage("User deleted successfully!");
//             fetchUsers();
//         } catch (error) {
//             setMessage("Error deleting user");
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <div className="d-flex justify-content-between align-items-center">
//                 <h2>Manage Users</h2>
//                 <div>
//                     <button className="btn btn-success me-2" onClick={() => setShowForm(!showForm)}>
//                         {showForm ? "✖ Hide Form" : "➕ Add User"}
//                     </button>
//                     <button
//                         className={`btn ${showInstructors ? "btn-secondary" : "btn-primary"}`}
//                         onClick={() => setShowInstructors(!showInstructors)}
//                     >
//                         {showInstructors ? "Show Students" : "Show Instructors"}
//                     </button>
//                 </div>
//             </div>

//             {message && <p className="alert alert-info mt-3">{message}</p>}

//             {/* User List */}
//             {!showInstructors ? (
//                 <>
//                     <h3 className="mt-4 text-success">Students</h3>
//                     {students.length > 0 ? (
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Batch</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {students.map(user => (
//                                     <tr key={user._id}>
//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>{user.batchId ? user.batchId.name || "N/A" : "Not Assigned"}</td>
//                                         <td>
//                                             <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p className="text-muted">No students available.</p>
//                     )}
//                 </>
//             ) : (
//                 <>
//                     <h3 className="mt-4 text-danger">Instructors</h3>
//                     {instructors.length > 0 ? (
//                         <table className="table table-striped">
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {instructors.map(user => (
//                                     <tr key={user._id}>
//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>
//                                             <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p className="text-muted">No instructors available.</p>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default ManageUsers;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [batches, setBatches] = useState([]);
    const [showInstructors, setShowInstructors] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        role: "Student",
        batchId: "",
    });

    useEffect(() => {
        fetchUsers();
        fetchBatches();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/users", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchBatches = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/batches");
            const today = new Date().toISOString().split("T")[0];
            const activeBatches = response.data.filter(batch => batch.endDate >= today);
            setBatches(activeBatches);
        } catch (error) {
            console.error("Error fetching batches:", error);
        }
    };

    const students = users.filter(user => user.role === "Student");
    const instructors = users.filter(user => user.role === "Instructor");

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/admin/users", newUser, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setMessage("User added successfully!");
            setNewUser({ name: "", email: "", password: "", mobile: "", role: "Student", batchId: "" });
            setShowForm(false);
            fetchUsers();
        } catch (error) {
            setMessage("Error adding user");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setMessage("User deleted successfully!");
            fetchUsers();
        } catch (error) {
            setMessage("Error deleting user");
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Manage Users</h2>
                <div>
                    <button className="btn btn-success me-2" onClick={() => setShowForm(!showForm)}>
                        {showForm ? "✖ Hide Form" : "➕ Add User"}
                    </button>
                    <button
                        className={`btn ${showInstructors ? "btn-secondary" : "btn-primary"}`}
                        onClick={() => setShowInstructors(!showInstructors)}
                    >
                        {showInstructors ? "Show Students" : "Show Instructors"}
                    </button>
                </div>
            </div>

            {message && <p className="alert alert-info mt-3">{message}</p>}

            {/* User Form (Two-Column Layout) */}
            {showForm && (
                <form onSubmit={handleSubmit} className="card p-4 mb-4">
                    <h5>Add New User</h5>
                    <div className="row">
                        {/* Left Column */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name="name" className="form-control" placeholder="User Name" value={newUser.name} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" className="form-control" placeholder="Email" value={newUser.email} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Password" value={newUser.password} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Mobile</label>
                                <input type="text" name="mobile" className="form-control" placeholder="Mobile" value={newUser.mobile} onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select name="role" className="form-select" value={newUser.role} onChange={handleChange}>
                                    <option value="Student">Student</option>
                                    <option value="Instructor">Instructor</option>
                                </select>
                            </div>

                            {/* Show Batch Selection Only for Students */}
                            {newUser.role === "Student" && (
                                <div className="mb-3">
                                    <label className="form-label">Assign to Batch</label>
                                    <select name="batchId" className="form-select" value={newUser.batchId} onChange={handleChange} required>
                                        <option value="">Select Batch</option>
                                        {batches.map(batch => (
                                            <option key={batch._id} value={batch._id}>{batch.name} ({batch.startDate} - {batch.endDate})</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Add User</button>
                </form>
            )}

            {/* User List */}
            {!showInstructors ? (
                <>
                    <h3 className="mt-4 text-success">Students</h3>
                    {students.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Batch</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.batchId ? user.batchId.name || "N/A" : "Not Assigned"}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-muted">No students available.</p>
                    )}
                </>
            ) : (
                <>
                    <h3 className="mt-4 text-danger">Instructors</h3>
                    <p className="text-muted">Instructor list will be displayed here.</p>
                </>
            )}
        </div>
    );
};

export default ManageUsers;

