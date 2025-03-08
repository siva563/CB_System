// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, Outlet } from "react-router-dom";
// import AdminDashboard from "../pages/AdminDashboard";
// import InstructorDashboard from "../pages/InstructorDashboard";
// import StudentDashboard from "../pages/StudentDashboard";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "./Layout.css"; // ✅ Import CSS for Animations

// const Layout = () => {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar State

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             try {
//                 setUser(JSON.parse(storedUser));
//             } catch (error) {
//                 console.error("Error parsing user data:", error);
//                 localStorage.removeItem("user");
//             }
//         }
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);
//         navigate("/login");
//     };

//     // ✅ Automatically set dashboard based on user role
//     // const getDashboardComponent = () => {
//     //     if (!user) return <h2 className="text-center">Unauthorized Access</h2>;
//     //     switch (user.role) {
//     //         case "Admin":
//     //             return <AdminDashboard />;
//     //         case "Instructor":
//     //             return <InstructorDashboard />;
//     //         case "Student":
//     //             return <StudentDashboard />;
//     //         default:
//     //             return <h2 className="text-center">Unauthorized Role</h2>;
//     //     }
//     // };

//     const getDashboardComponent = () => {
//         if (!user) return <h2 className="text-center">Unauthorized Access</h2>;
//         switch (user.role) {
//             case "Admin":
//                 return <AdminDashboard />;
//             case "Instructor":
//                 return <InstructorDashboard />;
//             case "Student":
//                 return <StudentDashboard />;
//             default:
//                 return <h2 className="text-center">Unauthorized Role</h2>;
//         }
//     };

//     return (
//         <div className="d-flex">
//             {/* ✅ Sidebar with Animation */}
//             <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
//                 <h4 className="text-center" style={{ margin: '10px' }}>📚 CB System</h4>
//                 <hr />
//                 <ul className="nav flex-column">
//                     <li className="nav-item">
//                         <Link className="nav-link text-white" to="/dashboard"><i className="bi bi-house-door-fill"></i> Dashboard</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link text-white" to="/assignments"><i className="bi bi-journal-text"></i> Assignments</Link>
//                     </li>
//                     {user?.role === "Instructor" && (
//                         <li className="nav-item">
//                             <Link className="nav-link text-white" to="/add-assignment"><i className="bi bi-plus-circle"></i> Add Assignment</Link>
//                         </li>
//                     )}
//                     {user?.role === "Admin" && (
//                         <>
//                             <li className="nav-item">
//                                 <Link className="nav-link text-white" to="/manage-users"><i className="bi bi-people"></i> Manage Users</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link text-white" to="/manage-batches"><i className="bi bi-calendar-event"></i> Manage Batches</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link text-white" to="/manage-fees"><i className="bi bi-cash"></i> Manage Fees</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link text-white" to="/manage-leads"><i className="bi bi-bar-chart-line"></i> Manage Leads</Link>
//                             </li>
//                         </>
//                     )}
//                 </ul>
//             </div>

//             {/* ✅ Main Content Area */}
//             <div className="flex-grow-1">
//                 {/* ✅ Top Navbar */}
//                 <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//                     <button className="btn btn-outline-primary me-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                         <i className={`bi ${isSidebarOpen ? "bi-list" : "bi-list-nested"}`}></i>
//                     </button>
//                     <h4 className="m-0">Welcome, {user?.name || "Guest"}</h4>
//                     <div className="ms-auto d-flex align-items-center">
//                         {user && (
//                             <>
//                                 <Link to="/profile" className="btn btn-outline-primary me-2">
//                                     <i className="bi bi-person-circle"></i> Profile
//                                 </Link>
//                                 <button className="btn btn-danger" onClick={handleLogout}>
//                                     <i className="bi bi-box-arrow-right"></i> Logout
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </nav>

//                 {/* ✅ Dynamic Dashboard Based on User Role */}
//                 <div className="p-4">
//                     {getDashboardComponent()}
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Layout;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import InstructorDashboard from "../pages/InstructorDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/Layout.css"; // ✅ Import CSS for Sidebar Animations

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar State

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="d-flex">
            {/* ✅ Sidebar with Animation */}
            <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
                <h4 className="text-center" style={{margin:'10px'}}>📚 CB System</h4>
                <hr />
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">
                            <i className="bi bi-house-door-fill"></i> Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/assignments">
                            <i className="bi bi-journal-text"></i> Assignments
                        </Link>
                    </li>
                    {user?.role === "Instructor" && (
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/add-assignment">
                                <i className="bi bi-plus-circle"></i> Add Assignment
                            </Link>
                        </li>
                    )}
                    {user?.role === "Admin" && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/manage-users">
                                    <i className="bi bi-people"></i> Manage Users
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/manage-batches">
                                    <i className="bi bi-calendar-event"></i> Manage Batches
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/manage-fees">
                                    <i className="bi bi-cash"></i> Manage Fees
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/manage-leads">
                                    <i className="bi bi-bar-chart-line"></i> Manage Leads
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            {/* ✅ Main Content Area */}
            <div className="flex-grow-1">
                {/* ✅ Top Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                    <button className="btn btn-outline-primary me-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <i className={`bi ${isSidebarOpen ? "bi-list" : "bi-list-nested"}`}></i>
                    </button>
                    <h4 className="m-0">Welcome, {user?.name || "Guest"}</h4>
                    <div className="ms-auto d-flex align-items-center">
                        {user && (
                            <>
                                <Link to="/profile" className="btn btn-outline-primary me-2">
                                    <i className="bi bi-person-circle"></i> Profile
                                </Link>
                                <button className="btn btn-danger" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right"></i> Logout
                                </button>
                            </>
                        )}
                    </div>
                </nav>

                {/* ✅ Only Show Dashboard When User Clicks "Dashboard" */}
                <div className="p-4">
                    {location.pathname === "/dashboard" && (
                        <>
                            {user?.role === "Admin" && <AdminDashboard />}
                            {user?.role === "Instructor" && <InstructorDashboard />}
                            {user?.role === "Student" && <StudentDashboard />}
                        </>
                    )}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;

