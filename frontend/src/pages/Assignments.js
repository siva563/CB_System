import React, { useState, useEffect } from "react";
import axios from "axios";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/assignments");
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "badge bg-success";
      case "Pending":
        return "badge bg-warning text-dark";
      case "Overdue":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Assignments</h2>

      {/* Search Bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search assignments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" type="button">Search</button>
      </div>

      {/* Assignments List */}
      <div className="row">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <div className="col-md-4 mb-4" key={assignment.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{assignment.title}</h5>
                  <p className="card-text"><strong>Due Date:</strong> {assignment.dueDate}</p>
                  <span className={getStatusBadge(assignment.status)}>{assignment.status}</span>

                  {/* Marks Section */}
                  <div className="mt-3">
                    <p className="mb-1"><strong>Marks:</strong> {assignment.marksObtained}/{assignment.totalMarks}</p>
                    <div className="progress">
                      <div 
                        className="progress-bar bg-info" 
                        role="progressbar" 
                        style={{ width: `${(assignment.marksObtained / assignment.totalMarks) * 100}%` }}
                        aria-valuenow={assignment.marksObtained} 
                        aria-valuemin="0" 
                        aria-valuemax={assignment.totalMarks}
                      >
                        {Math.round((assignment.marksObtained / assignment.totalMarks) * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-3">No assignments found.</p>
        )}
      </div>
    </div>
  );
};

export default Assignments;
