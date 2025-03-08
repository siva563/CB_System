import React, { useState, useEffect } from "react";
import axios from "axios";

const FeeManagement = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchStudentsWithFees();
    }, []);

    const fetchStudentsWithFees = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/fees", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            const fees = response.data;

            const studentsWithFees = fees.map(fee => ({
                id: fee._id,
                studentName: fee.studentId?.name || "Unknown Student",
                batchName: fee.batchId?.name || "Unknown Batch",
                totalFee: fee.totalAmount || 0,
                paidFee: fee.paidAmount || 0,
                pendingFee: fee.pendingAmount || 0,
                notes: fee.notes || "",
            }));

            setStudents(studentsWithFees);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleEditClick = (student) => {
        setSelectedStudent(student);
    };

    const handleSave = async () => {
        if (!selectedStudent) return;
        try {
            await axios.put(`http://localhost:5000/api/fees/update/${selectedStudent.id}`, {
                totalAmount: selectedStudent.totalFee,
                paidAmount: selectedStudent.paidFee,
                notes: selectedStudent.notes,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setMessage("Fee updated successfully!");
            setSelectedStudent(null);
            fetchStudentsWithFees(); // Refresh data
        } catch (error) {
            setMessage("Error updating fee");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Fee Management</h2>
            {message && <p className="alert alert-info mt-3">{message}</p>}

            <div className="row">
                {/* Student Fee Table */}
                <div className={`col-md-${selectedStudent ? "8" : "12"}`}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Batch</th>
                                <th>Total Fee</th>
                                <th>Paid</th>
                                <th>Pending</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.studentName}</td>
                                    <td>{student.batchName}</td>
                                    <td>{student.totalFee}</td>
                                    <td>{student.paidFee}</td>
                                    <td>{student.pendingFee}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary" onClick={() => handleEditClick(student)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Edit Panel (Right Side) */}
                {selectedStudent && (
                    <div className="col-md-4">
                        <div className="card p-4">
                            <h5>Manage Fee: {selectedStudent.studentName}</h5>
                            <p><strong>Batch:</strong> {selectedStudent.batchName}</p>
                            <p><strong>Pending Fee:</strong> {selectedStudent.totalFee - selectedStudent.paidFee}</p>

                            <div className="mb-3">
                                <label className="form-label">Total Fee</label>
                                <input type="number" className="form-control"
                                    value={selectedStudent.totalFee}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, totalFee: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Paid Amount</label>
                                <input type="number" className="form-control"
                                    value={selectedStudent.paidFee}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, paidFee: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Notes</label>
                                <textarea className="form-control"
                                    value={selectedStudent.notes}
                                    onChange={(e) => setSelectedStudent({ ...selectedStudent, notes: e.target.value })}></textarea>
                            </div>

                            <button className="btn btn-success w-100" onClick={handleSave}>Save</button>
                            <button className="btn btn-secondary w-100 mt-2" onClick={() => setSelectedStudent(null)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeeManagement;
