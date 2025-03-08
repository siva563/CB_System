import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    const [batchDetails, setBatchDetails] = useState({});
    const [feeDetails, setFeeDetails] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/users/profile", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            console.log("Fetched Profile Data:", response.data); // ✅ Debugging

            setUser(response.data);
            setProfilePicture(response.data.profilePicture || "https://via.placeholder.com/150");
            setBatchDetails(response.data.batchId || {});
            setFeeDetails({ 
                total: response.data.totalFee || 0, 
                paid: response.data.paidFee || 0, 
                due: response.data.dueFee || 0 
            });

        } catch (error) {
            setProfilePicture("https://via.placeholder.com/150");
            console.error("Error fetching profile:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">👤 My Profile</h2>
            <div className="card p-4 shadow-lg">
                <div className="row">
                    {/* ✅ Profile Details - Left Side */}
                    <div className="col-md-9">
                        <div className="row">
                            {/* ✅ Personal Details */}
                            <div className="col-md-4">
                                <h5>📝 Personal Details</h5>
                                <p><strong>Name:</strong> {user.name || "N/A"}</p>
                                <p><strong>Mobile:</strong> {user.mobile || "N/A"}</p>
                                <p><strong>Email:</strong> {user.email || "N/A"}</p>
                                <p><strong>Address:</strong> {user.address || "N/A"}</p>
                            </div>

                            {/* ✅ Batch & Fee Details (Only for Students) */}
                            {user.role === "Student" && (
                                <div className="col-md-4">
                                    <h5>📚 Course & Fee Details</h5>
                                    <p><strong>Batch:</strong> {batchDetails.name || "Not Assigned"}</p>
                                    <p><strong>Course:</strong> {batchDetails.selectedCourse || "N/A"}</p>
                                    <p><strong>Total Fee:</strong> ₹{feeDetails.total}</p>
                                    <p><strong>Paid Fee:</strong> ₹{feeDetails.paid}</p>
                                    <p><strong>Due Amount:</strong> ₹{feeDetails.due}</p>
                                </div>
                            )}

                            {/* ✅ Social Links */}
                            <div className="col-md-4">
                                <h5>🌐 Social Links</h5>
                                <p><strong>GitHub:</strong> <a href={user.github} target="_blank">View Profile</a></p>
                                <p><strong>LinkedIn:</strong> <a href={user.linkedin} target="_blank">View Profile</a></p>
                                <p><strong>Resume:</strong> {user.resume ? <a href={user.resume} target="_blank">Download</a> : "No Resume Uploaded"}</p>
                            </div>
                        </div>
                    </div>

                    {/* ✅ Profile Picture - Right Side */}
                    <div className="col-md-3 text-center">
                        <img src={profilePicture} className="rounded-circle mb-3" width="150" height="150" alt="Profile" />
                        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="form-control mb-2" />
                        <button className="btn btn-primary mb-3">Upload Picture</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
