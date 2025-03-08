import React from "react";

const StudentDashboard = () => {
  const enrolledCourses = [
    { id: 201, title: "React Basics", progress: "75%" },
    { id: 202, title: "Node.js Fundamentals", progress: "50%" }
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Student Dashboard</h2>

      <div className="row">
        <div className="col-md-6">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Courses Enrolled</h5>
              <p className="card-text">{enrolledCourses.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Overall Progress</h5>
              <p className="card-text">62%</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-4">My Courses</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map(course => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>{course.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
