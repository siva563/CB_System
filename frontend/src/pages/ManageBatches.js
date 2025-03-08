// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ManageBatches = () => {
//   const [batches, setBatches] = useState([]);
//   const [showCompleted, setShowCompleted] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [message, setMessage] = useState("");

//   const [newBatch, setNewBatch] = useState({
//     name: "",
//     batchType: "Normal",
//     startDate: "",
//     endDate: "",
//     selectedCourse: "Java Full Stack",
//     courseFee: "",
//     classType: "Offline",
//   });

//   const courseOptions = ["Java Full Stack", "Python Full Stack", "MERN Stack", "AI and ML", "Data Analysis", "Data Science"];

//   useEffect(() => {
//     fetchBatches();
//   }, []);

//   // const fetchBatches = async () => {
//   //   try {
//   //     const response = await axios.get("http://localhost:5000/api/batches");
//   //     setBatches(response.data);
//   //   } catch (error) {
//   //     console.error("Error fetching batches:", error);
//   //   }
//   // };

//   const fetchBatches = async () => {
//     try {
//         const response = await axios.get("http://localhost:5000/api/batches");
//         console.log("Fetched Batches:", response.data); // ✅ Debugging log
//         setBatches(response.data);
//     } catch (error) {
//         console.error("❌ Error fetching batches:", error);
//     }
// };

//   const today = new Date().toISOString().split("T")[0];
//   const activeBatches = batches.filter(batch => batch.endDate >= today);
//   const completedBatches = batches.filter(batch => batch.endDate < today);

//   const handleChange = (e) => {
//     setNewBatch({ ...newBatch, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/batches/create", newBatch, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setMessage("Batch added successfully!");
//       setNewBatch({ name: "", batchType: "Normal", startDate: "", endDate: "", selectedCourse: "Java Full Stack", courseFee: "", classType: "Offline" });
//       setShowForm(false);
//       fetchBatches();
//     } catch (error) {
//       setMessage("Error adding batch");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center">
//         <h2>Manage Batches</h2>
//         <div>
//           <button className="btn btn-success me-2" onClick={() => setShowForm(!showForm)}>
//             {showForm ? "✖ Hide Form" : "➕ Add Batch"}
//           </button>
//           <button
//             className={`btn ${showCompleted ? "btn-secondary" : "btn-primary"}`}
//             onClick={() => setShowCompleted(!showCompleted)}
//           >
//             {showCompleted ? "Show Active Batches" : "Show Completed Batches"}
//           </button>
//         </div>
//       </div>

//       {message && <p className="alert alert-info mt-3">{message}</p>}

//       {/* Batch Creation Form (Two-Column Layout) */}
//       {showForm && (
//         <form onSubmit={handleSubmit} className="card p-4 mb-4">
//           <h5>Add New Batch</h5>
//           <div className="row">
//             {/* Left Column */}
//             <div className="col-md-6">
//               <div className="mb-3">
//                 <label className="form-label">Batch Name</label>
//                 <input type="text" name="name" className="form-control" placeholder="Batch Name" value={newBatch.name} onChange={handleChange} required />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Batch Type</label>
//                 <select name="batchType" className="form-select" value={newBatch.batchType} onChange={handleChange}>
//                   <option value="Normal">Normal</option>
//                   <option value="Premium">Premium</option>
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Start Date</label>
//                 <input type="date" name="startDate" className="form-control" value={newBatch.startDate} onChange={handleChange} required />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">End Date</label>
//                 <input type="date" name="endDate" className="form-control" value={newBatch.endDate} onChange={handleChange} required />
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="col-md-6">
//               <div className="mb-3">
//                 <label className="form-label">Select Course</label>
//                 <select name="selectedCourse" className="form-select" value={newBatch.selectedCourse} onChange={handleChange}>
//                   {courseOptions.map((course) => (
//                     <option key={course} value={course}>{course}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Course Fee</label>
//                 <input type="number" name="courseFee" className="form-control" placeholder="Course Fee" value={newBatch.courseFee} onChange={handleChange} required />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Class Type</label>
//                 <select name="classType" className="form-select" value={newBatch.classType} onChange={handleChange}>
//                   <option value="Offline">Offline</option>
//                   <option value="Online">Online</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <button type="submit" className="btn btn-primary w-100 mt-3">Add Batch</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ManageBatches;



import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageBatches = () => {
  const [batches, setBatches] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const [newBatch, setNewBatch] = useState({
    name: "",
    batchType: "Normal",
    startDate: "",
    endDate: "",
    selectedCourse: "Java Full Stack",
    courseFee: "",
    classType: "Offline",
  });

  const courseOptions = ["Java Full Stack", "Python Full Stack", "MERN Stack", "AI and ML", "Data Analysis", "Data Science"];

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/batches");
      console.log("Fetched Batches:", response.data); // ✅ Debugging log
      setBatches(response.data);
    } catch (error) {
      console.error("❌ Error fetching batches:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const activeBatches = batches.filter(batch => batch.endDate && batch.endDate >= today);
  const completedBatches = batches.filter(batch => batch.endDate && batch.endDate < today);

  const handleChange = (e) => {
    setNewBatch({ ...newBatch, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/batches/create", newBatch, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMessage("Batch added successfully!");
      setNewBatch({ name: "", batchType: "Normal", startDate: "", endDate: "", selectedCourse: "Java Full Stack", courseFee: "", classType: "Offline" });
      setShowForm(false);
      fetchBatches();
    } catch (error) {
      setMessage("Error adding batch");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Manage Batches</h2>
        <div>
          <button className="btn btn-success me-2" onClick={() => setShowForm(!showForm)}>
            {showForm ? "✖ Hide Form" : "➕ Add Batch"}
          </button>
          <button
            className={`btn ${showCompleted ? "btn-secondary" : "btn-primary"}`}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? "Show Active Batches" : "Show Completed Batches"}
          </button>
        </div>
      </div>

      {message && <p className="alert alert-info mt-3">{message}</p>}

      {/* Batch Creation Form (Two-Column Layout) */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card p-4 mb-4">
          <h5>Add New Batch</h5>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Batch Name</label>
                <input type="text" name="name" className="form-control" placeholder="Batch Name" value={newBatch.name} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Batch Type</label>
                <select name="batchType" className="form-select" value={newBatch.batchType} onChange={handleChange}>
                  <option value="Normal">Normal</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input type="date" name="startDate" className="form-control" value={newBatch.startDate} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input type="date" name="endDate" className="form-control" value={newBatch.endDate} onChange={handleChange} required />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Select Course</label>
                <select name="selectedCourse" className="form-select" value={newBatch.selectedCourse} onChange={handleChange}>
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Course Fee</label>
                <input type="number" name="courseFee" className="form-control" placeholder="Course Fee" value={newBatch.courseFee} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Class Type</label>
                <select name="classType" className="form-select" value={newBatch.classType} onChange={handleChange}>
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Add Batch</button>
        </form>
      )}

      {/* Batch List Display */}
      <h3 className="mt-4">{showCompleted ? "Completed Batches" : "Active Batches"}</h3>
      {batches.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Course</th>
              <th>Course Fee</th>
              <th>Class Type</th>
            </tr>
          </thead>
          <tbody>
            {(showCompleted ? completedBatches : activeBatches).map(batch => (
              <tr key={batch._id}>
                <td>{batch.name}</td>
                <td>{batch.batchType}</td>
                <td>{batch.startDate}</td>
                <td>{batch.endDate}</td>
                <td>{batch.selectedCourse}</td>
                <td>{batch.courseFee}</td>
                <td>{batch.classType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No {showCompleted ? "completed" : "active"} batches available.</p>
      )}
    </div>
  );
};

export default ManageBatches;

