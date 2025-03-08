const express = require("express");
const Batch = require("../models/Batch");
const Fee = require("../models/Fee");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Create a New Batch (Admin Only)
router.post("/create", authMiddleware, async (req, res) => {
    try {
        console.log("Received Request Data:", req.body); // Debugging

        const { name, batchType, startDate, endDate, selectedCourse, courseFee, classType } = req.body;

        if (!name || !batchType || !startDate || !endDate || !selectedCourse || !courseFee || !classType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBatch = new Batch({ name, batchType, startDate, endDate, selectedCourse, courseFee, classType });
        await newBatch.save();

        res.status(201).json({ message: "Batch created successfully", batch: newBatch });
    } catch (error) {
        console.error("Batch Creation Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// ✅ Get All Batches
router.get("/", async (req, res) => {
    try {
        const batches = await Batch.find();
        res.json(batches);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Update a Batch (Admin Only)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id);
        if (!batch) return res.status(404).json({ message: "Batch not found" });

        const { name, batchType, startDate, endDate, courseType, courseFee, classType } = req.body;
        batch.name = name || batch.name;
        batch.batchType = batchType || batch.batchType;
        batch.startDate = startDate || batch.startDate;
        batch.endDate = endDate || batch.endDate;
        batch.courseType = courseType || batch.courseType;
        batch.courseFee = courseFee || batch.courseFee;
        batch.classType = classType || batch.classType;

        await batch.save();
        res.json({ message: "Batch updated successfully", batch });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Delete a Batch (Admin Only)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id);
        if (!batch) return res.status(404).json({ message: "Batch not found" });

        await Batch.findByIdAndDelete(req.params.id);
        res.json({ message: "Batch deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post("/assign-students", authMiddleware, async (req, res) => {
    try {
        const { batchId, studentIds } = req.body;
        const batch = await Batch.findById(batchId);

        if (!batch) return res.status(404).json({ message: "Batch not found" });

        const students = await User.find({ _id: { $in: studentIds }, role: "Student" });

        for (const student of students) {
            // Check if a fee record already exists for this student & batch
            const existingFee = await Fee.findOne({ studentId: student._id, batchId });

            if (!existingFee) {
                const newFee = new Fee({
                    studentId: student._id,
                    batchId: batch._id,
                    totalAmount: batch.courseFee, // Assign total fee from batch
                    paidAmount: 0,
                    pendingAmount: batch.courseFee, // Initially, full amount is pending
                    status: "Pending"
                });

                await newFee.save();
            }
        }

        res.json({ message: "Students assigned to batch and fees initialized" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
