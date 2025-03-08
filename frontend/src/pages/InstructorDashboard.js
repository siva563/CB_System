import React from "react";

const InstructorDashboard = () => {
    const courses = [
        { id: 101, title: "React Basics", students: 20 },
        { id: 102, title: "Node.js Fundamentals", students: 15 }
    ];

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Instructor Dashboard</h2>

            <div className="row">
                <div className="col-md-6">
                    <div className="card text-white bg-info mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Courses</h5>
                            <p className="card-text">{courses.length}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card text-white bg-secondary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Total Students</h5>
                            <p className="card-text">{courses.reduce((acc, course) => acc + course.students, 0)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="mt-4">Course Management</h3>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Course Name</th>
                        <th>Enrolled Students</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.title}</td>
                            <td>{course.students}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InstructorDashboard;
