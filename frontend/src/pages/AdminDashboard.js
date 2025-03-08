import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/dashboard", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setDashboardData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("❌ Error fetching dashboard data:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return <h2 className="text-center">Loading Dashboard...</h2>;
    }

    return (
        <div className="container mt-4">
            <h2>Admin Dashboard</h2>

            <div className="row">
                {/* Total Students */}
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Students</h5>
                            <h3>{dashboardData?.totalStudents}</h3>
                        </div>
                    </div>
                </div>

                {/* Total Instructors */}
                <div className="col-md-4">
                    <div className="card text-white bg-secondary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Instructors</h5>
                            <h3>{dashboardData?.totalInstructors}</h3>
                        </div>
                    </div>
                </div>

                {/* Total Batches */}
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Batches</h5>
                            <h3>{dashboardData?.totalBatches}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Total Fees Collected */}
                <div className="col-md-6">
                    <div className="card text-white bg-info mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Fees Collected</h5>
                            <h3>₹{dashboardData?.totalFeesCollected}</h3>
                        </div>
                    </div>
                </div>

                {/* Total Pending Fees */}
                <div className="col-md-6">
                    <div className="card text-white bg-danger mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Fees Pending</h5>
                            <h3>₹{dashboardData?.totalFeesPending}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Total Assignments Submitted */}
                <div className="col-md-12">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Assignments Submitted</h5>
                            <h3>{dashboardData?.totalAssignments}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
