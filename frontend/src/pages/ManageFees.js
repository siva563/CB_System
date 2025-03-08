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
            const response = await axios.get("http://localhost:5000/api/fees/students", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
    };

    const handleUpdateFee = async (id, paidFee, notes) => {
        try {
            await axios.put(`http://localhost:5000/api/fees/update/${id}`, {
                paidAmount: paidFee,
                notes: notes,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setMessage("Fee updated successfully!");
            fetchStudentsWithFees();
        } catch (error) {
            setMessage("Error updating fee");
        }
    };

    const handleSendReminder = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/fees/reminder/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setMessage("Reminder sent successfully!");
            fetchStudentsWithFees();
        } catch (error) {
            setMessage("Error sending reminder");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Fee Management</h2>
            {message && <p className="alert alert-info mt-3">{message}</p>}

            <div className="row">
                {/* Student List Table */}
                <div className="col-md-8">
                    <h3>All Students</h3>
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
                                        <button className="btn btn-sm btn-info" onClick={() => handleSelectStudent(student)}>Manage</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Student Fee Management Panel */}
                {selectedStudent && (
                    <div className="col-md-4">
                        <div className="card p-4">
                            <h5>Manage Fee: {selectedStudent.studentName}</h5>
                            <p><strong>Batch:</strong> {selectedStudent.batchName}</p>
                            <p><strong>Total Fee:</strong> {selectedStudent.totalFee}</p>
                            <p><strong>Paid Fee:</strong> {selectedStudent.paidFee}</p>
                            <p><strong>Pending Fee:</strong> {selectedStudent.pendingFee}</p>

                            <div className="mb-3">
                                <label className="form-label">Update Paid Amount</label>
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

                            <button className="btn btn-primary w-100" onClick={() => handleUpdateFee(selectedStudent.id, selectedStudent.paidFee, selectedStudent.notes)}>
                                Update Fee
                            </button>

                            <button className="btn btn-warning w-100 mt-2" onClick={() => handleSendReminder(selectedStudent.id)}>
                                Send Reminder
                            </button>

                            <button className="btn btn-secondary w-100 mt-2" onClick={() => setSelectedStudent(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeeManagement;
