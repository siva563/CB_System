// const express = require("express");
// const router = express.Router();

// const assignments = [
//     { id: 1, title: "React Basics", dueDate: "2024-03-01", status: "Pending", marksObtained: 5, totalMarks: 10 },
//     { id: 2, title: "Node.js Fundamentals", dueDate: "2024-02-25", status: "Completed", marksObtained: 8, totalMarks: 10 },
//     { id: 3, title: "MongoDB Integration", dueDate: "2024-02-20", status: "Overdue", marksObtained: 2, totalMarks: 10 }
// ];

// // Get Assignments List
// router.get("/", (req, res) => {
//     res.json(assignments);
// });

// module.exports = router;


const express = require("express");
const Assignment = require("../models/Assignment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create an Assignment (Only for Instructors)
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { title, dueDate, totalMarks } = req.body;
        if (!title || !dueDate || !totalMarks) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newAssignment = new Assignment({
            title,
            dueDate,
            totalMarks,
            status: "Pending",
        });

        await newAssignment.save();
        res.status(201).json({ message: "Assignment created successfully", assignment: newAssignment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get All Assignments
router.get("/", async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;

