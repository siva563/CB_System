import React, { useState, useEffect } from "react";
import axios from "axios";

const LeadManagement = () => {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [followUpDate, setFollowUpDate] = useState("");
    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [filterStatus, setFilterStatus] = useState("All");
    const [selectedFile, setSelectedFile] = useState(null);

    const [searchQuery, setSearchQuery] = useState(""); // ✅ Search query state

    const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", source: "Website" });

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/leads", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setLeads(response.data);
            setFilteredLeads(response.data);
        } catch (error) {
            console.error("Error fetching leads:", error);
        }
    };

    // ✅ Filter leads by status
    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
        applyFilters(e.target.value, searchQuery);
    };

    // ✅ Search leads by name or phone number
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        applyFilters(filterStatus, e.target.value);
    };

    // ✅ Apply filters (Search + Status)
    const applyFilters = (status, query) => {
        let updatedLeads = leads;

        if (status !== "All") {
            updatedLeads = updatedLeads.filter(lead => lead.status === status);
        }

        if (query) {
            updatedLeads = updatedLeads.filter(lead =>
                lead.name.toLowerCase().includes(query.toLowerCase()) ||
                lead.phone.includes(query)
            );
        }

        setFilteredLeads(updatedLeads);
    };

    const handleRowClick = (lead) => {
        setSelectedLead(lead);
        setFollowUpDate(lead.followUpDate ? lead.followUpDate.split("T")[0] : "");
        setStatus(lead.status);
        setNotes("");
    };

    const handleUpdate = async () => {
        if (!selectedLead) return;
        try {
            await axios.put(`http://localhost:5000/api/leads/update/${selectedLead._id}`, {
                status,
                followUpDate,
                notes,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setMessage("Lead updated successfully!");
            setSelectedLead(null);
            fetchLeads();
        } catch (error) {
            setMessage("Error updating lead");
        }
    };

    const handleChange = (e) => {
        setNewLead({ ...newLead, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/leads/create", newLead, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setMessage("Lead added successfully!");
            setShowForm(false);
            setNewLead({ name: "", email: "", phone: "", source: "Website" });
            fetchLeads();
        } catch (error) {
            setMessage("Error adding lead");
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setMessage("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://localhost:5000/api/leads/bulk-upload", formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "multipart/form-data" },
            });

            setMessage(response.data.message);
            fetchLeads(); // Refresh leads after upload
        } catch (error) {
            setMessage("Error uploading file");
        }
    };


    return (
        <div className="container mt-4">
            <h2>Lead Management</h2>

            {message && <p className="alert alert-info mt-3">{message}</p>}

            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
                    {showForm ? "✖ Hide Form" : "➕ Add New Lead"}
                </button>

                {/* ✅ Search Input */}
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search by Name or Phone"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />


                {/* <input type="file" className="form-control mb-2" onChange={handleFileChange} accept=".csv" />
                <button className="btn btn-primary w-100" onClick={handleFileUpload}>Upload CSV</button> */}


                {/* ✅ Dropdown Filter for Status */}
                <select className="form-select w-auto" value={filterStatus} onChange={handleFilterChange}>
                    <option value="All">All Leads</option>
                    <option value="New">New</option>
                    <option value="Call Not Connected">Call Not Connected</option>
                    <option value="Call Not Answered">Call Not Answered</option>
                    <option value="Details Explained">Details Explained</option>
                    <option value="Need a Demo">Need a Demo</option>
                    <option value="Demo Scheduled">Demo Scheduled</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Demo Attended">Demo Attended</option>
                    <option value="Follow-Up for Registration">Follow-Up for Registration</option>
                    <option value="Not Interested After Demo">Not Interested After Demo</option>
                    <option value="Joined Course">Joined Course</option>
                    <option value="Payment Pending">Payment Pending</option>
                    <option value="Payment Completed">Payment Completed</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Lead Table (Left Side) */}
            <div className={`row ${selectedLead ? "col-md-8" : "col-md-12"}`}>
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Source</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map(lead => (
                            <tr key={lead._id} onClick={() => handleRowClick(lead)} style={{ cursor: "pointer" }}>
                                <td>{lead.name}</td>
                                <td>{lead.email}</td>
                                <td>{lead.phone}</td>
                                <td>{lead.source}</td>
                                <td>
                                    <span className={`badge bg-${lead.status === "Completed" ? "success" : lead.status === "Interested" ? "primary" : "secondary"}`}>
                                        {lead.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Lead Update Card (Right Side) */}
            {selectedLead && (
                <div className="col-md-4">
                    <div className="card p-4">
                        <h5>Update Lead</h5>
                        <p><strong>Name:</strong> {selectedLead.name}</p>
                        <p><strong>Email:</strong> {selectedLead.email}</p>
                        <p><strong>Phone:</strong> {selectedLead.phone}</p>

                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="New">New</option>
                                <option value="Call Not Connected">Call Not Connected</option>
                                <option value="Call Not Answered">Call Not Answered</option>
                                <option value="Details Explained">Details Explained</option>
                                <option value="Need a Demo">Need a Demo</option>
                                <option value="Demo Scheduled">Demo Scheduled</option>
                                <option value="Not Interested">Not Interested</option>
                                <option value="Joined Course">Joined Course</option>
                                <option value="Payment Pending">Payment Pending</option>
                                <option value="Payment Completed">Payment Completed</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <button className="btn btn-success w-100" onClick={handleUpdate}>Update Lead</button>
                        <button className="btn btn-secondary w-100 mt-2" onClick={() => setSelectedLead(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeadManagement;
