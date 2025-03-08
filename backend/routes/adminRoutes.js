const express = require("express");
const User = require("../models/User");
const Fee = require("../models/Fee");
const Batch = require("../models/Batch");

const Assignment = require("../models/Assignment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();



router.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("-password").populate({
            path: "batchId",
            select: "name startDate endDate", // Fetch only necessary fields
        });

        res.json(users);
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// ✅ Create a Student (Admin Only) with Batch Assignment
router.post("/users", authMiddleware, async (req, res) => {
    try {
        const { name, email, password, mobile, role, batchId } = req.body;

        if (!name || !email || !password || !mobile || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Ensure batch exists if role is Student
        let batch;
        if (role === "Student") {
            if (!batchId) {
                return res.status(400).json({ message: "Batch ID is required for students" });
            }
            batch = await Batch.findById(batchId);
            if (!batch) return res.status(404).json({ message: "Batch not found" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password, mobile, role, batchId: role === "Student" ? batchId : null });
        await newUser.save();

        // ✅ Automatically Create Fee Record for Students
        if (role === "Student") {
            const newFee = new Fee({
                studentId: newUser._id,
                batchId: batch._id,
                totalAmount: batch.courseFee, // Assign batch fee
                paidAmount: 0,
                pendingAmount: batch.courseFee, // Initially, full amount is pending
                status: "Pending"
            });
            await newFee.save();
        }

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Update a User (Admin Only)
router.put("/users/:id", authMiddleware, async (req, res) => {
    try {
        const { name, email, mobile, role, batchId } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.mobile = mobile || user.mobile;
        user.batchId = role === "Student" ? batchId : user.batchId;

        await user.save();
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Delete a User (Admin Only)
router.delete("/users/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: "Student" });
        const totalInstructors = await User.countDocuments({ role: "Instructor" });
        const totalBatches = await Batch.countDocuments();

        const totalFees = await Fee.aggregate([
            { $group: { _id: null, totalCollected: { $sum: "$paidAmount" }, totalPending: { $sum: "$pendingAmount" } } }
        ]);

        const totalAssignments = await Assignment.countDocuments();

        res.json({
            totalStudents,
            totalInstructors,
            totalBatches,
            totalFeesCollected: totalFees[0]?.totalCollected || 0,
            totalFeesPending: totalFees[0]?.totalPending || 0,
            totalAssignments,
        });
    } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
